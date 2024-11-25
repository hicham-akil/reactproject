<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin (adjust for security in production)

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parapluitdatabase";

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the SQL query
    $query = $pdo->prepare("
        SELECT 
            avis.id, 
            avis.rating, 
            avis.comment, 
            CONCAT(users.firstName, ' ', users.lastName) AS author_name 
        FROM avis 
        JOIN users ON avis.user_id = users.id
    ");
    $query->execute();

    // Fetch results as an associative array
    $avis = $query->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON
    echo json_encode($avis);

} catch (PDOException $e) {
    // Return JSON error message if any exception occurs
    echo json_encode(['error' => "Database query failed: " . $e->getMessage()]);
    exit();
}
?>
