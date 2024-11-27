<?php
// Allow requests from specific origin (adjust this for better security)
header('Access-Control-Allow-Origin: http://localhost:5173');  // Replace with your frontend URL
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

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
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Read the JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Check if the userId is provided
if (isset($data['userId']) && !empty($data['userId'])) {
    $userId = intval($data['userId']); // Ensure userId is an integer

    // Query to fetch the user's cart items and aggregate them by item_id
    $query = "
        SELECT 
            item_id, 
            SUM(quantity) AS total_quantity, 
            SUM(price * quantity) AS total_price
        FROM cart
        WHERE user_id = ?
        GROUP BY item_id
    ";

    // Prepare and execute the SQL query
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $userId); // Bind the userId to the query
        $stmt->execute();
        $result = $stmt->get_result();

        // Prepare an array for the order items
        $orderItems = [];
        while ($row = $result->fetch_assoc()) {
            $orderItems[] = [
                'item_id' => $row['item_id'],
                'quantity' => $row['total_quantity'],
                'price' => $row['total_price']
            ];
        }

        // Check if items were found
        if (count($orderItems) > 0) {
            // Return the order data as JSON if items are found
            echo json_encode(['items' => $orderItems]);
        } else {
            // Return a message if no items are found
            echo json_encode(['message' => 'No items found in the cart']);
        }

        $stmt->close();
    } else {
        // Error handling if the query preparation fails
        echo json_encode(['error' => 'Error with SQL query preparation: ' . $conn->error]);
    }
} else {
    // Error if userId is not provided or invalid
    echo json_encode(['error' => 'User ID is required and must be valid']);
}

// Close the database connection
$conn->close();
?>
