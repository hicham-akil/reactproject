import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Data() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/data.php") // Update with your PHP file's actual path
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleAddToCartClick = (itemId, itemPrice, itemImage) => {
    // Pass the image URL, itemId, and itemPrice in the URL parameters
    navigate(`/item/${itemId}/price/${itemPrice}/image/${encodeURIComponent(itemImage)}`);
  };

  return (
    <div className="flex flex-col mt-auto pt-6 " >
       <div class="bigdud ">
      <div class="bul1 "></div>
      <div class="article  rounded-2xl">
        <p>ARTICLE</p>
      </div>
      <div class="bul2"></div>
    </div>
      <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, perspiciatis.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-light-gray p-4 rounded-lg shadow-md flex flex-col justify-between" style={{width:"350px",height:"350px"}}
          >
            <img
              style={{ width: "150px" }}
              src={item.src}
              alt={`Image for ${item.p}`}
              className="w-full translate-x-20 h-32 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {item.p}
            </h3>
            <p className="text-md text-gray-600 text-center mb-3">
              ${item.price}
            </p>
            <button
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => handleAddToCartClick(item.id, item.price, item.src)} // Pass the image URL
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
