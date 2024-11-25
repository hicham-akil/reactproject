<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from specific origins (you can replace '*' with your actual domain for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parapluitdatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed.']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
$firstName = trim($data['firstName']);
$lastName = trim($data['lastName']);
$email = trim($data['email']);
$password = trim($data['password']);
$phone = trim($data['phone']);
$shippingAddress = trim($data['shippingAddress']);

// Check if all required fields are provided
if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Required fields are missing.']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format.']);
    exit;
}

// Hash the password for storage
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare SQL query to insert the new user
$stmt = $conn->prepare("INSERT INTO users (firstName, lastName, email, password, phone, shippingAddress) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $firstName, $lastName, $email, $hashedPassword, $phone, $shippingAddress);

// Execute the query
if ($stmt->execute()) {
    $userId = $stmt->insert_id; // Get the ID of the newly inserted user
    echo json_encode(['success' => true, 'userId' => $userId]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to register user.']);
}

// Close connections
$stmt->close();
$conn->close();
?>
