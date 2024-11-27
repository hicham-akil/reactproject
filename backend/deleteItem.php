<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request (preflight) - CORS preflight check
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with 200 status for preflight requests and exit
    http_response_code(200);
    exit;
}

// Check if POST request is being made
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Database connection
    $servername = "localhost";
    $username = "root"; // Your DB username
    $password = ""; // Your DB password
    $dbname = "parapluitdatabase"; // Your DB name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
    }

    // Get the request body (JSON payload)
    $data = json_decode(file_get_contents("php://input"));

    // Check if required parameters are provided
    if (!isset($data->userId) || !isset($data->itemId)) {
        echo json_encode(["error" => "User ID and Item ID are required."]);
        exit;
    }

    // Extract user and item IDs
    $user_id = $data->userId;
    $item_id = $data->itemId;

    // Prepare SQL query to delete item from the cart
    $sql = "DELETE FROM cart WHERE user_id = ? AND item_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $item_id); // Bind user_id and item_id as integers

    if ($stmt->execute()) {
        echo json_encode(["success" => "Item deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete the item"]);
    }

    // Close the connection
    $stmt->close();
    $conn->close();
}
?>
