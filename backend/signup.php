<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parapluitdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
$firstName = trim($data['firstName']);
$lastName = trim($data['lastName']);
$email = trim($data['email']);
$password = trim($data['password']);
$phone = trim($data['phone']);
$shippingAddress = trim($data['shippingAddress']);

if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Required fields are missing.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format.']);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);


$stmt = $conn->prepare("INSERT INTO users (firstName, lastName, email, password, phone, shippingAddress) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $firstName, $lastName, $email, $hashedPassword, $phone, $shippingAddress);

// Execute the query
if ($stmt->execute()) {
    $userId = $stmt->insert_id; 
    echo json_encode(['success' => true, 'userId' => $userId]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to register user.']);
}

// Close connections
$stmt->close();
$conn->close();
?>
