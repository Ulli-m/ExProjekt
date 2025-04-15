<?php
// I database.php
$servername = "mysql"; // samma som container_name eller service name i docker-compose
$username = "root";
$password = "rootpassword";
$dbname = "Booking";

$conn = new mysqli($servername, $username, $password, $dbname);


// Kontrollera om anslutningen lyckades
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
