import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrolly, setScrolly] = useState(0);
  const [showOrder, setShowOrder] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [navBackground, setNavBackground] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const storedUsername = localStorage.getItem('firstName');
    if (userId && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('user_id');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      setIsAuthenticated(false);
      setUsername(null);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const fetchOrderData = async () => {
    if (!showOrder) {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          setError('User is not logged in');
          return;
        }
        const response = await fetch('http://localhost/BACKEND/order.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
          setShowOrder(true);
        } else {
          setError('Failed to fetch order data');
        }
      } catch (error) {
        setError('Error fetching order data: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setShowOrder(false);
    }
  };

  return (
    <nav className={`py-4 w-full z-50 ${navBackground ? 'bg-white' : 'bg-black'} text-white transition-all`}>
      <div className="container mx-auto flex justify-between items-center px-8">
        <h1 className={`font-[Montserrat] text-2xl ${navBackground ? 'text-blue-300' : 'bg-black'}`}>
          Pluie <span className="text-blue-400">&</span> Style
        </h1>
        <div className="menu flex space-x-12">
          <a href="#" className="relative group hover:text-gray-400">Home</a>
          <a href="#" className="relative group hover:text-gray-400">Products</a>
          <a href="#" className="relative group hover:text-gray-400">About</a>
          <a href="#" className="relative group hover:text-gray-400">Contact</a>
        </div>
        <button
          onClick={fetchOrderData}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Panier
        </button>
        <div className="flex items-center space-x-4">
          {isAuthenticated && username && (
            <span className="text-white font-semibold">Hello, {username}!</span>
          )}
          <button
            onClick={handleAuthClick}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 ml-4"
          >
            {isAuthenticated ? 'Se Déconnecter' : 'Se Connecter'}
          </button>
        </div>
      </div>
      {loading && <div className="text-center text-white mt-2">Chargement en cours...</div>}
      {error && <div className="text-center text-red-500 mt-2">{error}</div>}
      {showOrder && (
        <div className="order-info bg-gray-100 p-4 mt-4 rounded shadow-lg mx-auto w-1/5 mr-20">
          <h2 className="text-lg font-bold">Votre Commande</h2>
          {orderData ? (
            <ul>
              {orderData.items.length > 0 ? (
                orderData.items.map((item, index) => (
                  <li key={index} className="mt-2">
                    Cart ID: {item.cart_id} - Item ID: {item.item_id} - Quantity: {item.quantity} - Price: {item.price}€
                  </li>
                ))
              ) : (
                <p>Aucun article dans la commande.</p>
              )}
            </ul>
          ) : (
            <p>Chargement de la commande...</p>
          )}
          <button
            onClick={() => navigate('/payment')}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
          >
            Payer
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
