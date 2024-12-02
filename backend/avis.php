<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers to handle JSON and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Adjust this to your frontend's origin
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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

// Check if user_id is provided
if (isset($_GET['user_id']) && is_numeric($_GET['user_id'])) {
    $user_id = (int)$_GET['user_id'];

    // Query to fetch all reviews
    $allReviewsQuery = "
        SELECT avis.id, avis.rating, avis.comment
        FROM avis 
       
    ";

    // Fetch all reviews
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

    // Fetch the logged-in user's review
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

    // Respond with all reviews and the user's review
    echo json_encode(['success' => true, 'allReviews' => $allReviews, 'userReview' => $userReview]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid or missing user ID']);
}

$conn->close();
?>
