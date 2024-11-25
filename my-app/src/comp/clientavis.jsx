import { useEffect, useState } from "react";

export default function Avis() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  const user_id = localStorage.getItem("user_id");
  console.log(user_id)

  // Fetch the user's reviews
  useEffect(() => {
    if (!user_id) {
      alert("You must be logged in to view your reviews.");
      return;
    }

    fetch(`http://localhost/backend/avis.php?user_id=${user_id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [user_id]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new review
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user_id) {
      alert("You must be logged in to submit a review!");
      return;
    }

    const reviewData = { ...newReview, user_id };

    fetch("http://localhost/backend/add_avis.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Avis added successfully!");
          setReviews((prev) => [...prev, { ...reviewData, id: Date.now() }]);
          setNewReview({ rating: "", comment: "" });
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  // Delete review
  const handleDelete = (review_id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const user_id = localStorage.getItem("user_id");
  
      fetch("http://localhost/backend/deleateavis.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_id, user_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Review deleted successfully!");
            setReviews(reviews.filter((review) => review.id !== review_id));
          } else {
            alert("Error: " + data.message); // Make sure to check the response here
          }
        })
        .catch((error) => console.error("Error deleting review:", error));
    }
  };
  
  return (
    <div className="bg-pink-300 flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold">AVIS DE NOS CLIENTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white mt-5 p-8 rounded-lg shadow-md">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-pink-50 rounded-lg transition hover:shadow-lg"
            >
              <div className="text-xl">{'★'.repeat(review.rating)}</div>
              <p className="mt-2">{review.comment}</p>
              <span className="block mt-2 font-semibold">{review.author_name}</span>

              {/* Ensure button is shown only if review belongs to the logged-in user */}
              {parseInt(review.user_id) === parseInt(user_id) && (
                <button
                  onClick={() => handleDelete(review.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Aucun avis pour le moment.</p>
        )}
      </div>

      {/* Add Review Form */}
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
          placeholder="Your comment"
          value={newReview.comment}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded mb-3"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
