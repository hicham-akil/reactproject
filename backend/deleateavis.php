<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parapluitdatabase";

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);

    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['review_id'], $data['user_id'])) {
        $review_id = $data['review_id'];
        $user_id = $data['user_id'];

        // Prepare the query to check if the review belongs to the logged-in user
        $query = $pdo->prepare("SELECT user_id FROM avis WHERE id = :review_id");
        $query->bindParam(':review_id', $review_id, PDO::PARAM_INT);
        $query->execute();
        $review = $query->fetch(PDO::FETCH_ASSOC);

        if ($review) {
            if ($review['user_id'] == $user_id) {
                // Proceed to delete the review if it belongs to the user
                $deleteQuery = $pdo->prepare("DELETE FROM avis WHERE id = :review_id");
                $deleteQuery->bindParam(':review_id', $review_id, PDO::PARAM_INT);
                $deleteQuery->execute();

                echo json_encode(["success" => true, "message" => "Review deleted successfully"]);
            } else {
                // If the review doesn't belong to the user
                echo json_encode(["success" => false, "message" => "Review does not belong to this user"]);
            }
        } else {
            // If the review doesn't exist
            echo json_encode(["success" => false, "message" => "Review not found"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Missing review_id or user_id"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
