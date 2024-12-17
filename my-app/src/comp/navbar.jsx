import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [navBackground, setNavBackground] = useState(false);
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

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all ${navBackground ? 'bg-white shadow-md' : 'bg-black'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
        <h1 className={`text-2xl font-bold transition-colors ${navBackground ? 'text-blue-600' : 'text-white'}`}>
          Pluie <span className="text-blue-400">&</span> Style
        </h1>

        <button
          className="md:hidden focus:outline-none p-2 rounded bg-gray-200"
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
          <a onClick={() => navigate('/')} className="text-white hover:text-gray-300 translate-y-1 mt-2 cursor-pointer">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300 translate-y-3">
            Products
          </a>
          <a href="#" className="text-white hover:text-gray-300 translate-y-3">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300 translate-y-3">
            Contact
          </a>
          {isAuthenticated && (
            <span className="text-white text-center font-semibold translate-y-3 translate-x-5">{username}!</span>
          )}

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 translate-x-5 md:space-y-0">
            <button
              onClick={handleAuthClick}
              className="bg-green-500 px-4 py-2 text-white rounded-full hover:bg-green-600"
            >
              {isAuthenticated ? 'Se Déconnecter' : 'Se Connecter'}
            </button>
            <button
              onClick={() => navigate('/panier')}
              className="bg-blue-500 px-4 py-2 text-white rounded-full hover:bg-blue-600"
            >
              Panier
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
