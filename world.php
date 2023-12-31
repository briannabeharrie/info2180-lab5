<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
if (isset($_GET['country'])) {
    $country = $_GET['country'];

    $stmt = $conn->prepare("SELECT * FROM countries WHERE name LIKE :country");
    $stmt->bindValue(':country', '%' . $country . '%', PDO::PARAM_STR);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (isset($_GET['lookup']) && $_GET['lookup'] === 'cities') {
        $stmt = $conn->prepare("SELECT cities.name AS cityName, cities.district, cities.population
                            FROM cities
                            JOIN countries ON cities.country_code = countries.code
                            WHERE countries.name LIKE :country");

        $stmt->bindValue(':country', '%' . $country . '%', PDO::PARAM_STR);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    if ($_GET['lookup'] === 'country') {
        if (!empty($results)) {
            echo '<table border="1">';
            echo '<tr><th>Country Name</th><th>Continent</th><th>Independence Year</th><th>Head of State</th></tr>';
            foreach ($results as $row) {
                echo '<tr>';
                echo '<td>' . $row['name'] . '</td>';
                echo '<td>' . $row['continent'] . '</td>';
                echo '<td>' . $row['independence_year'] . '</td>';
                echo '<td>' . $row['head_of_state'] . '</td>';
                echo '</tr>';
            }
            echo '</table>';
        } else {
            echo 'No results found.';
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode($results);
    }  
}
?>
