<?php
$host = 'mysql';
$port = 3306;
$username = 'root';
$password = 'rootpassword';
$database = 'Booking';

// Skapa anslutning
$conn = new mysqli($host, $username, $password, $database, $port);

// Kontrollera anslutning
if ($conn->connect_error) {
    die("Anslutningen misslyckades: " . $conn->connect_error);
}

// Du kan använda detta för att testa
// echo "Ansluten till databasen!";
?>
