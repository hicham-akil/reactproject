<?php
// Allow requests from the frontend
header('Access-Control-Allow-Origin: http://localhost:5173');  // Replace with your frontend URL
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection settings
$servername = "localhost"; // Your database server (use 'localhost' for local development)
$username = "root";        // Your database username
$password = "";            // Your database password
$database = "parapluitdatabase"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// Read the JSON input
$data = json_decode(file_get_contents('php://input'));

// Debugging: Log the input data to a file
file_put_contents('debug.log', print_r($data, true)); // Writes the input to a log file

// Check if required fields are provided
if (isset($data->userId, $data->cardName, $data->cardNumber, $data->expiryDate, $data->cvv, $data->totalAmount, $data->orderItems)) {
    $userId = $data->userId;
    $totalPrice = $data->totalAmount;
    $cardName = $data->cardName;
    $cardNumber = $data->cardNumber;
    $expiryDate = $data->expiryDate;
    $cvv = $data->cvv;
    $status = 'Completed'; // Assume the payment was successful

    // Get the last 4 digits of the card
    $cardLastFour = substr($cardNumber, -4);

    // Start a transaction
    $conn->begin_transaction();

    try {
        // Prepare SQL query to insert payment data
        $query = "INSERT INTO payments (user_id, total_price, card_name, card_last_four, status)
                  VALUES (?, ?, ?, ?, ?)";
        
        // Insert payment details
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("idsss", $userId, $totalPrice, $cardName, $cardLastFour, $status);
            $stmt->execute();
            $paymentId = $stmt->insert_id; // Get the inserted payment ID
            $stmt->close();
        } else {
            throw new Exception('Error inserting payment data');
        }

        // Now, delete the items from the user's cart after successful payment
        $deleteQuery = "DELETE FROM cart WHERE user_id = ?";
        if ($deleteStmt = $conn->prepare($deleteQuery)) {
            $deleteStmt->bind_param("i", $userId);
            $deleteStmt->execute();
            $deleteStmt->close();
        } else {
            throw new Exception('Error deleting cart items');
        }

        // Commit the transaction
        $conn->commit();

        // Return success message
        echo json_encode(['success' => true, 'message' => 'Payment processed successfully and cart cleared.']);
    } catch (Exception $e) {
        // Rollback the transaction if any error occurs
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error processing payment: ' . $e->getMessage()]);
    }
} else {
    // If any required field is missing, return an error message
    echo json_encode(['success' => false, 'message' => 'Required data not provided']);
}

$conn->close();
?>
