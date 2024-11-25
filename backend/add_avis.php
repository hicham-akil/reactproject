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
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Read input JSON from request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input
    if (isset($data['user_id'], $data['rating'], $data['comment']) && 
        is_numeric($data['user_id']) && 
        is_numeric($data['rating']) && 
        $data['rating'] >= 1 && $data['rating'] <= 5 &&
        !empty($data['comment'])) {
        
        $user_id = intval($data['user_id']);
        $rating = intval($data['rating']);
        $comment = trim($data['comment']);

        // Insert data into the database
        $query = $pdo->prepare("INSERT INTO avis (user_id, rating, comment) VALUES (:user_id, :rating, :comment)");
        $query->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $query->bindParam(':rating', $rating, PDO::PARAM_INT);
        $query->bindParam(':comment', $comment, PDO::PARAM_STR);

        if ($query->execute()) {
            echo json_encode(["success" => true, "message" => "Avis added successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to add avis"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
