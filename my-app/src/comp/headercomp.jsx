import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logoimg from '../img/logo.jpg'; // Importing the image

function Header() {
    const [showOrder, setShowOrder] = useState(false); // State to toggle visibility of the order info
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error messages

    const navigate = useNavigate(); // Hook for navigation

    // Function to fetch order data
    const fetchOrderData = async () => {
        if (!showOrder) {
            setLoading(true);
            setError(null);
            try {
                const userId = localStorage.getItem('user_id'); // Get userId from localStorage
                if (!userId) {
                    setError('User is not logged in');
                    return;
                }

                // Send the userId to the backend via POST request
                const response = await fetch('http://localhost/BACKEND/order.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Send userId in the body
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrderData(data); // Set the order data received from backend
                    setShowOrder(true); // Show the order data
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

    // Function to navigate to the payment page
    const handlePayment = () => {
        navigate('/payment'); // Navigate to the "/payment" route
    };

    return (
        <>
            {/* Top section with background */}
            <div className="bg-blue-300 w-full p-4">
                <p className="text-center text-base sm:text-lg md:text-xl">
                    Parapluie homme, parapluie femme & parapluie enfant : boutique en ligne N°1 des parapluies pour tous en France !
                </p>
            </div>

            {/* Information section aligned to the right */}
            <div className="info flex justify-end items-center space-x-4 sm:space-x-2 py-4 px-4 overflow-x-hidden">
                <span className="text-xs sm:text-sm">Livraison 48h</span>
                <i className="fas fa-shipping-fast"></i>
                <span className="text-xs sm:text-sm">Colissimo</span>
                <i className="fas fa-box"></i>
                <span className="text-xs sm:text-sm">Relais</span>
                <i className="fas fa-store"></i>
                <a href="#" className="flex items-center text-xs sm:text-sm">
                    <i className="fas fa-comment-dots"></i> Contact
                </a>
                <a href="tel:0980803535" className="flex items-center text-xs sm:text-sm">
                    <i className="fas fa-phone-alt"></i> 09 80 80 35 35
                </a>
            </div>

            {/* Panier Button */}
            <div className="flex">
                <button 
                    onClick={fetchOrderData}
                    className="bg-blue-100 text-white px-4 py-2 rounded-full hover:bg-blue-600 flex items-center text-sm"
                >
                    <i className="fas fa-shopping-cart"></i> 
                    Panier
                </button>
            </div>

            {/* Conditional Order Data Display */}
            {loading && <div>Loading order data...</div>} {/* Show loading text when fetching */}
            {error && <div className="text-red-500">{error}</div>} {/* Show error message */}
            {showOrder && (
                <div className="order-info bg-gray-100 p-4 mt-4 rounded shadow-lg">
                    <h2 className="text-lg font-bold">Votre Commande</h2>
                    {orderData ? (
                        <ul>
                            {orderData.items && orderData.items.length > 0 ? (
                                orderData.items.map((item, index) => (
                                    <li key={index} className="mt-2">
                                        <p>
                                            Cart ID: {item.cart_id} - Item ID: {item.item_id} - Quantity: {item.quantity} - Price: {item.price}€
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p>Aucun article dans la commande.</p>
                            )}
                        </ul>
                    ) : (
                        <p>Chargement de la commande...</p>
                    )}

                    {/* Payer Button */}
                    <button
                        onClick={handlePayment}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                    >
                        Payer
                    </button>
                </div>
            )}

            {/* Logo and Search Section */}
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-6 sm:py-4">
                <div className="logobrand flex-shrink-0">
                    <img src={logoimg} alt="Logo" className="w-32 h-auto sm:w-42" />
                </div>
                <div className="cherche mt-4 sm:mt-0 sm:text-left text-center w-full sm:w-auto">
                    <p className="text-2xl text-center sm:text-lg md:text-2xl">Cherchez le parapluie</p>
                    <input
                        type="text"
                        className="mt-2 border border-gray-800 rounded p-2 w-full sm:w-auto max-w-xs"
                        placeholder="Entrez votre recherche"
                    />
                </div>
            </div>
        </>
    );
}

export default Header;
