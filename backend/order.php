<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "parapluitdatabase";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userId']) && !empty($data['userId'])) {
    $userId = intval($data['userId']);

    $query = "
        SELECT 
            item_id, 
            SUM(quantity) AS total_quantity, 
            SUM(price * quantity) AS total_price
        FROM cart
        WHERE user_id = ?
        GROUP BY item_id
    ";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        $orderItems = [];
        while ($row = $result->fetch_assoc()) {
            $orderItems[] = [
                'item_id' => $row['item_id'],
                'quantity' => $row['total_quantity'],
                'price' => $row['total_price']
            ];
        }

        if (count($orderItems) > 0) {
            echo json_encode(['items' => $orderItems]);
        } else {
            echo json_encode(['message' => 'No items found in the cart']);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Error with SQL query preparation: ' . $conn->error]);
    }
} else {
    echo json_encode(['error' => 'User ID is required and must be valid']);
}

$conn->close();
?>
