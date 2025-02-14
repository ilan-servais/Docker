<?php
$data = json_decode(file_get_contents("php://input"), true);
if ($data) {
    $resultsFile = "/var/www/html/results.json";
    $results = file_exists($resultsFile) ? json_decode(file_get_contents($resultsFile), true) : [];
    $results[] = $data;
    file_put_contents($resultsFile, json_encode($results, JSON_PRETTY_PRINT));
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
