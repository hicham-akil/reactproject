<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "parapluitdatabase"; 

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$queries = [
    "users_count" => "SELECT COUNT(*) as count FROM users",
    "items_count" => "SELECT COUNT(*) as count FROM items",
    "carts_count" => "SELECT COUNT(*) as count FROM cart",
    "payments_count" => "SELECT COUNT(*) as count FROM payments",
    "total_payment_value" => "SELECT SUM(total_price) as total FROM payments",
    "avis_count" => "SELECT COUNT(*) as count FROM avis" 
];

$results = [];

foreach ($queries as $key => $sql) {
    $result = $conn->query($sql);
    if ($result) {
        $row = $result->fetch_assoc();
        $results[$key] = isset($row['total']) ? $row['total'] : $row['count'];
    } else {
        $results[$key] = 0;
    }
}

echo json_encode($results);

$conn->close();
?>
