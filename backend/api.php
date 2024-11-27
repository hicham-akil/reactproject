<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = [
    "message" => "Hello from the PHP backend!",
    "success" => true
];

echo json_encode($data);
?>
