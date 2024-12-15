import { useEffect, useState } from "react";

export default function Avis() {
  const [allReviews, setAllReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });
  const user_id = localStorage.getItem("user_id");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

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
          setUserReview({ ...reviewData, id: Date.now() });
          setAllReviews((prev) => [...prev, { ...reviewData, author_name: "You" }]);
          setNewReview({ rating: "", comment: "" });
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => console.error("Error adding review:", error));
  };

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
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Avis de nos clients</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white mt-5 p-8 rounded-lg shadow-md">
        {allReviews.length > 0 ? (
          allReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-200 rounded-lg transition hover:shadow-lg"
            >
              <div className="text-xl">{'★'.repeat(review.rating)}</div>
              <p className="mt-2">{review.comment}</p>
              <span className="block mt-2 font-semibold">{review.author_name}</span>
            </div>
          ))
        ) : (
          <p>Aucun avis pour le moment.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        {userReview ? (
          <div className="bg-white mb-10 p-6 rounded-lg shadow-md w-full max-w-md">
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
          <form
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-10"
            onSubmit={handleSubmit}
          >
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
    </div>
  );
}
