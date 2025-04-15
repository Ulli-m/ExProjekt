<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

require_once '../database.php';

// Hämta parametrar
$frisor_id = $_GET['frisor_id'] ?? null;
$behandling_id = $_GET['behandling_id'] ?? null;
$start = $_GET['start'] ?? null;
$slut = $_GET['slut'] ?? null;

if (!$frisor_id || !$behandling_id || !$start || !$slut) {
    http_response_code(400);
    echo json_encode(["error" => "Ogiltiga eller saknade parametrar"]);
    exit;
}

try {
    // 1. Hämta varaktighet för behandlingen
    $stmt = $conn->prepare("SELECT varaktighet FROM behandling WHERE id = ?");
    $stmt->bind_param("i", $behandling_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        throw new Exception("Behandling hittades inte.");
    }

    $varaktighet = (int)$row['varaktighet'];

    // 2. Hämta bokade tider för frisören i valt intervall
    $stmt = $conn->prepare("SELECT datum, tid FROM bokningar WHERE frisor_id = ? AND datum BETWEEN ? AND ? AND status = 'bokad'");
    $stmt->bind_param("iss", $frisor_id, $start, $slut);
    $stmt->execute();
    $result = $stmt->get_result();

    $bokade = [];
    while ($row = $result->fetch_assoc()) {
        $nyckel = $row['datum'] . '-' . substr($row['tid'], 0, 5);
        $bokade[$nyckel] = true;
    }

    // 3. Skapa lediga tider per dag
    $ledigaTider = [];
    $startDate = new DateTime($start);
    $endDate = new DateTime($slut);

    for ($date = clone $startDate; $date <= $endDate; $date->modify('+1 day')) {
        $dag = $date->format("Y-m-d");
        $tider = [];

        for ($h = 9; $h <= 17; $h++) {
            for ($m = 0; $m <= (60 - $varaktighet); $m += 30) {
                $tid = sprintf('%02d:%02d', $h, $m);
                $nyckel = $dag . '-' . $tid;

                if (!isset($bokade[$nyckel])) {
                    $tider[] = $tid;
                }
            }
        }

        // Endast inkludera dag om det finns lediga tider
        if (!empty($tider)) {
            $ledigaTider[] = [
                "date" => $dag,
                "times" => $tider
            ];
        }
    }

    echo json_encode($ledigaTider);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Fel: " . $e->getMessage()]);
}

