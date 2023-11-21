document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('lookup').addEventListener('click', function () {
        fetchData('country');
    });

    document.getElementById('lookupCities').addEventListener('click', function () {
        fetchData('cities');
    });

    function fetchData(lookupType) {
        var country = document.getElementById('country').value;
        fetch(`http://localhost/info2180-lab5/world.php?country=${country}&lookup=${lookupType}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                if (lookupType === 'country' && response.headers.get('content-type').startsWith('text/html')) {
                    return response.text();
                } else {
                    return response.json();
                }
            })
            .then(data => displayResults(data, lookupType))
            .catch(error => {
                console.error('Error:', error);
                displayError('An error occurred while fetching data.');
            });
    }

    function displayError(message) {
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<p>' + message + '</p>';
    }

    function displayResults(results, lookupType) {
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        if (lookupType === 'cities') {
            var table = document.createElement('table');
            table.classList.add('city-table');

            var headerRow = table.insertRow(0);
            for (var key in results[0]) {
                var th = document.createElement('th');
                th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                headerRow.appendChild(th);
            }

            results.forEach(function (row) {
                var tr = table.insertRow();
                for (var key in row) {
                    var cell = tr.insertCell();
                    cell.textContent = row[key];
                }
            });
            resultDiv.appendChild(table);
        } else if (lookupType === 'country') {
            resultDiv.innerHTML = results;
        }
    }
});