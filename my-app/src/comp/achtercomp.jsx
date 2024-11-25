import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import oif from '../img/OIF.jpg'; 
import thumbnail1 from '../img/th.jpg'; 
import thumbnail2 from '../img/th7.jpg';

function Achter() {
  const { Id, price } = useParams(); // Extract 'Id' and 'price' from the URL
  const [currentImage, setCurrentImage] = useState(oif); // Set default image
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [userId, setUserId] = useState(null); // For storing userId (from localStorage)
  const [itemData, setItemData] = useState({ name: 'Loading...', price: '...' }); // Item data
  const [error, setError] = useState(''); // To handle error messages
  const [loading, setLoading] = useState(false); // To track loading state
  const [numericPrice, setNumericPrice] = useState(null); // To store numeric value of price

  // Extract numeric price from the URL
  useEffect(() => {
    if (price) {
      const numeric = parseFloat(price.replace('$', '')); // Remove '$' and convert to number
      setNumericPrice(numeric);
    }
  }, [price]);

  // Fetch user ID from localStorage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id'); // Fetch from localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Set userId if it exists
      console.log("User ID from localStorage:", storedUserId); // Debugging log
    } else {
      setError('Please log in to add items to your cart');
      console.log("No user ID found in localStorage."); // Debugging log
    }
  }, []);

  // Set item data directly from the URL
  useEffect(() => {
    if (Id && price) {
      setItemData({ name: `Item ${Id}`, price: price });
    } else {
      setError('Item not found');
    }
  }, [Id, price]);

  // Handle thumbnail clicks to change the main image
  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  const addToCart = async () => {
    console.log("User ID at addToCart:", userId); // Debugging log for userId in addToCart function
    if (!userId) {
      setError('Please log in to add items to your cart');
      return;
    }
  
    if (!Id || !quantity || quantity < 1) {
      setError('Please select a valid item and quantity.');
      return;
    }
  
    setLoading(true);
    const dataToSend = { userId, Id, quantity, price }; // Prepare the data to send
    console.log('Data to send:', dataToSend); // Debugging log
  
    try {
      const response = await fetch('http://localhost/backend/add_to_cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      const data = await response.json();
      console.log('Response from server:', data); // Debugging log
  
      if (data.error) {
        setError(data.error);
      } else {
        setError(''); // Clear any previous error messages
        alert(data.message); // Success message from backend
  
        // Store item in localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const newItem = {
          id: Id,
          name: itemData.name,
          quantity: quantity,
          price: numericPrice,
          totalPrice: numericPrice * quantity,
        };
  
        const existingItemIndex = cartItems.findIndex((item) => item.id === Id);
        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += quantity;
          cartItems[existingItemIndex].totalPrice += numericPrice * quantity;
        } else {
          cartItems.push(newItem);
        }
  
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    } catch (error) {
      setError('Error adding item to cart');
      console.error('Error:', error); // Debugging log
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1 mb-4">
          <img src={currentImage} alt="Main" className="w-3/4 h-auto rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col space-y-2">
          <img
            src={thumbnail1}
            alt="Thumbnail 1"
            onClick={() => handleThumbnailClick(thumbnail1)}
            className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
          />
          <img
            src={thumbnail2}
            alt="Thumbnail 2"
            onClick={() => handleThumbnailClick(thumbnail2)}
            className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
          />
          <img
            src={oif}
            alt="Thumbnail 3"
            onClick={() => handleThumbnailClick(oif)}
            className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
          />
        </div>
      </div>

      <div className="info mt-4 p-4 bg-white rounded-lg shadow-md">
        {loading ? (
          <p>Loading item data...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">{itemData.name}</h1>
            <p className="text-lg text-gray-700 mb-4">Price: {itemData.price}</p>
          </>
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="bg-gray-200 rounded-md px-2 py-1"
          >
            +
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-200 rounded-md px-2 py-1"
          >
            -
          </button>
          <button
            onClick={addToCart}
            disabled={loading}
            className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Achter;
