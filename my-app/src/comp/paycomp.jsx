import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const [orderData, setOrderData] = useState(null); // State to hold order data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const userId = localStorage.getItem('user_id'); // Retrieve user_id from localStorage
                if (!userId) {
                    setError('User is not logged in');
                    return;
                }

                const response = await fetch('http://localhost/BACKEND/order.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Pass the userId to the backend
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.items && data.items.length > 0) {
                        setOrderData(data);
                    } else {
                        setError('No items found in your cart');
                    }
                } else {
                    setError('Failed to fetch order details from the server');
                }
            } catch (error) {
                setError('An error occurred while fetching order details: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);

    // Handle Delete All Items
    const handleDeleteAllItems = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                setError('User is not logged in.');
                return;
            }
    
            // Send a request to delete all items for the user
            const response = await fetch('http://localhost/BACKEND/deleteOrder.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }), // Pass userId to the backend
            });
    
            const data = await response.json();
            if (data.success) {
                alert(data.success);
                setOrderData(null); // Clear the order data from state
                navigate('/'); // Redirect to home page or cart page
            } else {
                setError(data.error || 'Failed to delete items');
            }
        } catch (error) {
            setError('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Payment
    const handlePayment = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId || !orderData) {
                setError('User is not logged in or order data is missing.');
                return;
            }
    
            // Simulate payment details (replace with real user inputs)
            const paymentDetails = {
                userId,
                cardName: document.getElementById('cardName').value,
                cardNumber: document.getElementById('cardNumber').value,
                expiryDate: document.getElementById('expiryDate').value,
                cvv: document.getElementById('cvv').value,
                totalAmount: orderData.items.reduce((total, item) => total + item.price * item.quantity, 0),
                orderItems: orderData.items, // Send order items
            };

            // Log the payment details to debug missing data
            console.log('Payment Details:', paymentDetails);

            // Send payment details to the backend
            const response = await fetch('http://localhost/BACKEND/payment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert(data.message || 'Payment successful! Thank you for your purchase.');
                    setOrderData(null); // Clear the order data
                    navigate('/'); // Redirect to home page
                } else {
                    setError(data.message || 'Payment failed.');
                }
            } else {
                setError('Failed to connect to the payment API.');
            }
        } catch (error) {
            setError('An error occurred during payment: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading your order...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded shadow-lg" style={{ marginTop: "40%", width: "500px" }}>
            <h1 className="text-2xl font-bold text-center mb-4">Payment Page</h1>

            {orderData ? (
                <div>
                    <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                    <ul className="mb-4">
                        {orderData.items.map((item, index) => (
                            <li key={index} className="mb-2">
                                <p>
                                    <strong>Cart ID:</strong> {item.cart_id} <br />
                                    <strong>Item ID:</strong> {item.item_id} <br />
                                    <strong>Quantity:</strong> {item.quantity} <br />
                                    <strong>Price:</strong> {item.price}€ <br />
                                </p>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-xl font-bold">
                        Total Price: {orderData.items.reduce((total, item) => total + item.price * item.quantity, 0)}€
                    </h3>
                </div>
            ) : (
                <p>No items found in your order.</p>
            )}

            {/* Button to Delete All Items */}
            <button
                onClick={handleDeleteAllItems}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
            >
                Delete All Items
            </button>

            {/* Payment Form */}
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Payment Details</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="cardName" className="block font-medium">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            id="cardName"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="cardNumber" className="block font-medium">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <label htmlFor="expiryDate" className="block font-medium">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                id="expiryDate"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div>
                            <label htmlFor="cvv" className="block font-medium">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="123"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handlePayment}
                        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PaymentPage;
