import { useEffect, useState } from "react";

export default function Avis() {
  const [allReviews, setAllReviews] = useState([]); // All reviews from the database
  const [userReview, setUserReview] = useState(null); // Logged-in user's review
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });
  const user_id = localStorage.getItem("user_id");

  // Fetch all reviews and the logged-in user's review
  useEffect(() => {
    if (!user_id) {
      alert("You must be logged in to view reviews.");
      return;
    }

    fetch(`http://localhost/backend/avis.php?user_id=${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAllReviews(data.allReviews);
          setUserReview(data.userReview);
        } else {
          console.error("Error fetching reviews:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [user_id]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  // Submit or update review
  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = { ...newReview, user_id };

    fetch("http://localhost/backend/add_avis.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setUserReview({ ...reviewData, id: Date.now() }); // Assuming the backend returns the updated review
          setAllReviews((prev) => [...prev, { ...reviewData, author_name: "You" }]);
          setNewReview({ rating: "", comment: "" });
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  // Delete review
  const handleDelete = () => {
    fetch("http://localhost/backend/deleateavis.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setUserReview(null);
          setAllReviews((prev) => prev.filter((review) => review.user_id !== parseInt(user_id)));
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  return (
    <div className="bg-pink-300 flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold">Avis de nos clients</h1>

      {/* Display all reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white mt-5 p-8 rounded-lg shadow-md">
        {allReviews.length > 0 ? (
          allReviews.map((review) => (
            <div key={review.id} className="p-4 bg-pink-50 rounded-lg transition hover:shadow-lg">
              <div className="text-xl">{'★'.repeat(review.rating)}</div>
              <p className="mt-2">{review.comment}</p>
              <span className="block mt-2 font-semibold">{review.author_name}</span>
            </div>
          ))
        ) : (
          <p>Aucun avis pour le moment.</p>
        )}
      </div>

      {/* User's Review Section */}
      {userReview ? (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-lg font-bold">Votre avis</h2>
          <div className="text-xl">{'★'.repeat(userReview.rating)}</div>
          <p className="mt-2">{userReview.comment}</p>
          <button
            onClick={handleDelete}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <form className="mt-6 bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">Ajouter un avis</h2>
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <textarea
            name="comment"
            placeholder="Votre commentaire"
            value={newReview.comment}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded mb-3"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Soumettre
          </button>
        </form>
      )}
    </div>
  );
}
