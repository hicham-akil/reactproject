import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Panier() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const storedUsername = localStorage.getItem('firstName');
    if (userId && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      fetchCartItems();
    }
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

  const fetchCartItems = async () => {
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
        setCartItems(data.items || []);
      } else {
        setError('Failed to fetch cart items');
      }
    } catch (error) {
      setError(`Error fetching cart items: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  const handleReturnToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Votre Panier</h1>
        <button
          onClick={handleAuthClick}
          className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
        >
          {isAuthenticated ? 'Se Déconnecter' : 'Se Connecter'}
        </button>
      </div>

      {loading && <p className="text-gray-600">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && cartItems.length === 0 && (
        <p className="text-gray-600">Votre panier est vide.</p>
      )}

      {!loading && !error && cartItems.length > 0 && (
        <div>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.cart_id} className="py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">Prix: {item.price}€</p>
                  <p className="text-gray-600">Quantité: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleProceedToPayment}
              className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
            >
              Passer au paiement
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleReturnToHome}
          className="bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default Panier;
