import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [navBackground, setNavBackground] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
      setNavBackground(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.clear();
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
          headers: { 'Content-Type': 'application/json' },
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
        setError(`Error fetching order data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      setShowOrder(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all ${navBackground ? 'bg-white shadow-md' : 'bg-black'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
        <h1 className={`text-2xl font-bold transition-colors ${navBackground ? 'text-blue-600' : 'text-white'}`}>
          Pluie <span className="text-blue-400">&</span> Style
        </h1>

        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <div
          className={`flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 ${
            menuOpen ? 'flex' : 'hidden md:flex'
          }`}
        >
          <a onClick={() => navigate('/')} className="text-white hover:text-gray-300 cursor-pointer">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Products
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {isAuthenticated && (
              <span className="text-white text-center font-semibold">{username}!</span>
            )}
            <button
              onClick={handleAuthClick}
              className="bg-green-500 px-4 py-2 text-white rounded-full hover:bg-green-600"
            >
              {isAuthenticated ? 'Se Déconnecter' : 'Se Connecter'}
            </button>
            <button
              onClick={fetchOrderData}
              className="bg-blue-500 px-4 py-2 text-white rounded-full hover:bg-blue-600"
            >
              Panier
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="text-center text-black mt-4">Chargement...</div>}
      {error && <div className="text-center text-red-500 mt-2">{error}</div>}
      {showOrder && (
        <div className="bg-gray-100 p-4 mt-4 rounded shadow-lg mx-auto w-11/12 md:w-1/2">
          <h2 className="text-lg font-bold mb-2">Votre Commande</h2>
          {orderData?.items?.length ? (
            <ul className="list-disc pl-5">
              {orderData.items.map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>Cart ID:</strong> {item.cart_id}, <strong>Item:</strong> {item.item_id},{' '}
                  <strong>Qty:</strong> {item.quantity}, <strong>Price:</strong> {item.price}€
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun article trouvé.</p>
          )}
          <button
            onClick={() => navigate('/payment')}
            className="bg-green-500 mt-4 px-4 py-2 rounded hover:bg-green-600"
          >
            Payer
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
