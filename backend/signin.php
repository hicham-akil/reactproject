<?php
// Enable error reporting (for debugging)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

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

// Handle preflight requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Terminate the script for preflight requests
}

// Get the posted JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Check if email and password are set
if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    // Sanitize input email (Optional but recommended)
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    // Query to fetch user data based on email
    $sql = "SELECT id, password, firstName, lastName, phone, shippingAddress FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, verify password
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Password is correct, return user details
            echo json_encode([
                "success" => true,
                "user_id" => $user['id'],  // Correct the field to 'id'
                "firstName" => $user['firstName'],
                "lastName" => $user['lastName'],
                "phone" => $user['phone'],
                "shippingAddress" => $user['shippingAddress']
            ]);
        } else {
            // Incorrect password
            echo json_encode(["error" => "Incorrect password"]);
        }
    } else {
        // User not found
        echo json_encode(["error" => "User not found"]);
    }
} else {
    echo json_encode(["error" => "Email and password are required."]);
}

// Close the connection
$conn->close();
?>
