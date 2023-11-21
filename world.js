document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('lookup').addEventListener('click', function () {
        fetchData('country');
    });

    document.getElementById('lookupCities').addEventListener('click', function () {
        fetchData('cities');
    });

    function fetchData(lookupType) {
        var country = document.getElementById('country').value;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'world.php?country=' + country + '&lookup=' + lookupType, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                displayResults(response, lookupType);
            }
        };
        xhr.send();
    }

    function displayResults(results, lookupType) {
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        if (results.length > 0 && results[0].cityName) {
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
        } else {
            var ul = document.createElement('ul');
            ul.classList.add('country-list');

            results.forEach(function (row) {
                var li = document.createElement('li');
                li.textContent = row.name + ' is ruled by ' + row.head_of_state;
                ul.appendChild(li);
            });

            resultDiv.appendChild(ul);
        }
    }
});