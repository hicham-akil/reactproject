import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Data() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost/backend/data.php") // Update with your PHP file's actual path
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setVisibleItems(Array(data.length).fill(false));
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleAddToCartClick = (itemId, itemPrice) => {
    navigate(`/item/${itemId}/price/${itemPrice}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newVisibleItems = [...prev];
              newVisibleItems[index] = true;
              return newVisibleItems;
            });
          } else {
            setVisibleItems((prev) => {
              const newVisibleItems = [...prev];
              newVisibleItems[index] = false;
              return newVisibleItems;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const itemsElements = document.querySelectorAll(".item");
    itemsElements.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div className="grid grid-cols-4 grid-row-2 gap-4 mt-5 h-screen p-4 mainone">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`item bg-red-300 p-4 rounded-lg shadow-md flex flex-col items-center responsive-card transition-transform duration-500 ${
            visibleItems[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-lg text-center">{item.p}</p>
          <p className="text-lg text-center">${item.price}</p>
          <img
            src={item.src}
            alt={`Image for ${item.p}`}
            className="w-32 h-32 object-cover rounded mt-2 transition-transform duration-300 hover:scale-110"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            onClick={() => handleAddToCartClick(item.id, item.price)}
          >
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}
