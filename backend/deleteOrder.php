<?php
// Allow requests from specific origin (adjust this for better security)
header('Access-Control-Allow-Origin: http://localhost:5173');  // Replace with your frontend URL
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // Respond OK for OPTIONS request
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
    // Return error in case of a database connection failure
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// Read the JSON input
$data = json_decode(file_get_contents('php://input'));

// Check if the userId is provided
if (isset($data->userId)) {
    $userId = $data->userId;

    // Delete all orders for the user
    $query = "DELETE FROM cart WHERE user_id = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $userId); // Bind the userId to the query
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Order deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete order']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error preparing the query: ' . $conn->error]);
    }
} else {
    // Error if userId is not provided
    echo json_encode(['success' => false, 'message' => 'User ID is required']);
}

// Close the database connection
$conn->close();
?>
