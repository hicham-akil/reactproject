<?php


// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Set content type to JSON
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "parapluitdatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Return JSON error message and exit
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// SQL query to fetch data
$mysql = "SELECT id, nom FROM parapluithomme"; 
$result = $conn->query($mysql);

// Initialize an array to hold the data
$data2 = [];

if ($result->num_rows > 0) {
    // Fetch each row of data
    while ($row = $result->fetch_assoc()) {
        $data2[] = $row; // Append each row to the data array
    }
} else {
    $data2 = ["message" => "0 results"];
}

// Return the fetched data as JSON
echo json_encode($data2);

// Close the connection
$conn->close();
?>
