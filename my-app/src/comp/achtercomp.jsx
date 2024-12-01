import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Achter() {
  const { Id, price, image } = useParams();
  const [currentImage, setCurrentImage] = useState(decodeURIComponent(image) || 'default-image.jpg');
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [itemData, setItemData] = useState({ name: 'Loading...', price: '...', description: 'Loading product details...' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [numericPrice, setNumericPrice] = useState(null);

  useEffect(() => {
    if (price) {
      const numeric = parseFloat(price.replace('$', ''));
      setNumericPrice(numeric);
    }
  }, [price]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('Please log in to add items to your cart');
    }
  }, []);

  useEffect(() => {
    if (Id && price) {
      setItemData({
        name: `Item ${Id}`,
        price,
        description: `This is a detailed description of Item ${Id}. It's designed to provide a better understanding of the product, highlighting its features and benefits.`,
        category: 'Electronics',
        rating: 4.5,
      });
    } else {
      setError('Item not found');
    }
  }, [Id, price]);

  const addToCart = async () => {
    if (!userId) {
      setError('Please log in to add items to your cart');
      return;
    }
    if (!Id || quantity < 1) {
      setError('Please select a valid item and quantity.');
      return;
    }

    setLoading(true);
    const dataToSend = { userId, Id, quantity, price };

    try {
      const response = await fetch('http://localhost/backend/add_to_cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        alert(data.message);
        setError('');
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const newItem = {
          id: Id,
          name: itemData.name,
          quantity,
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md" style={{marginTop:"40px"}}>
      <div className="flex flex-col md:flex-row items-center">
        <img src={currentImage} alt={itemData.name} className="w-full md:w-1/2 rounded-lg shadow-lg" />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-semibold text-gray-800">{itemData.name}</h1>
          <p className="text-xl text-gray-600">Price: {itemData.price}</p>
          <p className="text-sm text-gray-500 mt-2">Category: {itemData.category}</p>
          <p className="text-sm text-yellow-500 mt-1">Rating: ⭐ {itemData.rating}/5</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Description</h2>
        <p className="text-gray-700 mt-2">{itemData.description}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Quantity</h2>
        <div className="flex items-center space-x-4">
          <button onClick={() => setQuantity((prev) => prev + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
            +
          </button>
          <span className="text-xl">{quantity}</span>
          <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
            -
          </button>
          <button
            onClick={addToCart}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition duration-300 disabled:bg-gray-400"
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
