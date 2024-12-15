<?php
header("Access-Control-Allow-Origin: http://localhost:5174");

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

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

$searchTerm = $_GET['q'] ?? '';

if ($searchTerm) {
    // Sanitize input
    $searchTerm = $conn->real_escape_string($searchTerm);

    $sql = "SELECT id, p, price, src FROM items WHERE p LIKE ?";
    $stmt = $conn->prepare($sql);
    $likeSearch = "%" . $searchTerm . "%";
    $stmt->bind_param("s", $likeSearch);
    $stmt->execute();
    $result = $stmt->get_result();

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
