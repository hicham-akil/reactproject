<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers to handle JSON and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "parapluitdatabase";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

if (isset($_GET['user_id']) && is_numeric($_GET['user_id'])) {
    $user_id = (int)$_GET['user_id'];

    $allReviewsQuery = "
        SELECT avis.id, avis.rating, avis.comment
        FROM avis 
       
    ";

    $allReviews = [];
    if ($result = $conn->query($allReviewsQuery)) {
        while ($row = $result->fetch_assoc()) {
            $allReviews[] = $row;
        }
        $result->free();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error fetching all reviews: ' . $conn->error]);
        $conn->close();
        exit;
    }

    $userReview = null;
    $userReviewQuery = "SELECT * FROM avis WHERE user_id = ?";
    if ($stmt = $conn->prepare($userReviewQuery)) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $userReview = $result->fetch_assoc();
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error preparing user review query: ' . $conn->error]);
        $conn->close();
        exit;
    }

    echo json_encode(['success' => true, 'allReviews' => $allReviews, 'userReview' => $userReview]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid or missing user ID']);
}

$conn->close();
?>
