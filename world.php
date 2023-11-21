<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

if (isset($_GET['country'])) {
    $country = $_GET['country'];

    $stmt = $conn->query("SELECT * FROM countries WHERE name LIKE '%$country%'");

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (isset($_GET['lookup']) && $_GET['lookup'] === 'cities') {
        $stmt = $conn->query("SELECT cities.name AS cityName, cities.district, cities.population
                            FROM cities
                            JOIN countries ON cities.countrycode = countries.code
                            WHERE countries.name LIKE '%$country%'");

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    header('Content-Type: application/json');
    echo json_encode($results);
}
?>
