<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require_once '../database.php'; // <- Obs! ../ för att gå upp en nivå till src/
if ($conn->connect_error) {
    die(" Anslutningen misslyckades: " . $conn->connect_error);
} else {
    echo " Ansluten till databasen!";
}
?>

