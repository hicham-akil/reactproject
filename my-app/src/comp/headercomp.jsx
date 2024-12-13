import React, { useState } from "react";
import pic from "../img/girl.jpg";
import pic2 from "../img/OIP.jpg";
import pic3 from "../img/oop.jpg";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `http://localhost/backend/cherche.php?q=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      {/* Info Section */}
      <div className="info flex flex-wrap justify-center sm:justify-end items-center space-x-2 py-4 px-4 overflow-x-hidden text-gray-800">
        <span className="text-xs sm:text-sm flex items-center">
          <i className="fas fa-shipping-fast mr-1"></i> Livraison 48h
        </span>
        <span className="text-xs sm:text-sm flex items-center">
          <i className="fas fa-box mr-1"></i> Colissimo
        </span>
        <span className="text-xs sm:text-sm flex items-center">
          <i className="fas fa-store mr-1"></i> Relais
        </span>
        <a href="#" className="flex items-center text-xs sm:text-sm hover:underline">
          <i className="fas fa-comment-dots mr-1"></i> Contact
        </a>
        <a href="tel:0980803535" className="flex items-center text-xs sm:text-sm hover:underline">
          <i className="fas fa-phone-alt mr-1"></i> 09 80 80 35 35
        </a>
      </div>

      {/* Search Section */}
      <div className="cherche flex flex-col items-center mt-6">
        <p className="text-2xl sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Cherchez le parapluie
        </p>
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-lg p-3 w-11/12 sm:w-72 md:w-96 text-center"
            placeholder="Entrez votre recherche"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Rechercher
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {searchResults.map((item) => (
    <li
      key={item.id}
      className="mb-4 flex items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-200"
    >
    
      <img
        src={item.src}
        alt={item.p}
        className="w-16 h-16 object-cover rounded-lg shadow-md mr-4"
      />
      <div>
        <a
          href={`/item/${item.id}/price/${item.price}/image/${encodeURIComponent(
            item.src
          )}`}
          className="font-bold text-blue-500 hover:underline text-sm sm:text-base"
        >
          {item.p}
        </a>
        <p className="text-gray-700 text-xs sm:text-sm">Price: ${item.price}</p>
      </div>

      <a
        href={`/item/${item.id}/price/${item.price}/image/${encodeURIComponent(
          item.src
        )}`}
        className="ml-auto text-pink-500 hover:text-pink-600 text-lg"
        title="Like this item"
      >
        <i className="fas fa-heart"></i>
      </a>
    </li>
  ))}
</ul>

      {/* Images Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex justify-center">
          <img
            src={pic}
            alt="Girl with umbrella"
            className="w-full max-w-sm rounded-lg shadow-lg border-4"
          />
        </div>
        <div className="flex justify-center">
          <img
            src={pic2}
            alt="Girl with umbrella 2"
            className="w-full max-w-sm rounded-lg shadow-lg border-4"
          />
        </div>
        <div className="flex justify-center">
          <img
            src={pic3}
            alt="Girl with umbrella 3"
            className="w-full max-w-sm rounded-lg shadow-lg border-4"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
