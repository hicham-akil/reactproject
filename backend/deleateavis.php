<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers to handle JSON and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Adjust this to your frontend's origin
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read the JSON input
$data = json_decode(file_get_contents('php://input'));

// Check if required fields are provided
if (isset($data->user_id)) {
    $user_id = (int)$data->user_id;

    // Database connection settings
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "parapluitdatabase";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
        exit;
    }

    // Delete the user's review
    $deleteQuery = "DELETE FROM avis WHERE user_id = ?";
    $stmt = $conn->prepare($deleteQuery);
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Review deleted successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete the review.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Required data not provided']);
}
?>
