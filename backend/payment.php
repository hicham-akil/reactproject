<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'));

file_put_contents('debug.log', print_r($data, true));

if (isset($data->userId, $data->cardName, $data->cardNumber, $data->expiryDate, $data->cvv, $data->totalAmount, $data->orderItems)) {
    $userId = $data->userId;
    $totalPrice = $data->totalAmount;
    $cardName = $data->cardName;
    $cardNumber = $data->cardNumber;
    $expiryDate = $data->expiryDate;
    $cvv = $data->cvv;
    $status = 'Completed';

    $cardLastFour = substr($cardNumber, -4);

    $conn->begin_transaction();

    try {
        $query = "INSERT INTO payments (user_id, total_price, card_name, card_last_four, status)
                  VALUES (?, ?, ?, ?, ?)";
        
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("idsss", $userId, $totalPrice, $cardName, $cardLastFour, $status);
            $stmt->execute();
            $paymentId = $stmt->insert_id;
            $stmt->close();
        } else {
            throw new Exception('Error inserting payment data');
        }

        $deleteQuery = "DELETE FROM cart WHERE user_id = ?";
        if ($deleteStmt = $conn->prepare($deleteQuery)) {
            $deleteStmt->bind_param("i", $userId);
            $deleteStmt->execute();
            $deleteStmt->close();
        } else {
            throw new Exception('Error deleting cart items');
        }

        $conn->commit();

        echo json_encode(['success' => true, 'message' => 'Payment processed successfully and cart cleared.']);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error processing payment: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Required data not provided']);
}

$conn->close();
?>
