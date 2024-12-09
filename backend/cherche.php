<?php
header("Access-Control-Allow-Origin: http://localhost:5174");

// Allow the required methods (GET, POST, etc.)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS requests for preflight (for complex requests)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parapluitdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get the search term from the request
$searchTerm = $_GET['q'] ?? '';

if ($searchTerm) {
    // Sanitize input
    $searchTerm = $conn->real_escape_string($searchTerm);

    // Query to search items by name
    $sql = "SELECT id, p, price, src FROM items WHERE p LIKE ?";
    $stmt = $conn->prepare($sql);
    $likeSearch = "%" . $searchTerm . "%";
    $stmt->bind_param("s", $likeSearch);
    $stmt->execute();
    $result = $stmt->get_result();

    // Return results as JSON
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    echo json_encode($items);
} else {
    echo json_encode([]);
}

$conn->close();
?>
