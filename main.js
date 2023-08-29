document.addEventListener('DOMContentLoaded', function () {
    // Initial search form event listener
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const city = document.getElementById('cityInput').value;
        fetchWeatherData(city);
        // Show the .weather-info element
        document.querySelector('.weather-info').style.display = 'block';
    });

    // Event delegation for searchForm2
    document.addEventListener('submit', function (event) {
        event.preventDefault();

        if (event.target.id === 'searchForm2') {
            const newCity = document.getElementById('cityInput2').value;
            fetchWeatherData(newCity);
        }
    });

    function fetchWeatherData(city) {
        const key = "7c633cfa7ae8424fb3b02508232408";
        const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${key}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temperature = data.current.temp_f;
                const condition = data.current.condition.text.toLowerCase();
                const icon = data.current.condition.icon;
                const wind_mph = data.current.wind_mph;
                const wind_dir = data.current.wind_dir;
                const location = data.location.name;

                // Update the weather information display
                document.getElementById('location').innerText = location;
                document.getElementById('condition-icon').src = `https:${icon}`;
                document.getElementById('temperature').innerText = `Current temperature: ${temperature}°F`;
                document.getElementById('condition').innerText = `Current condition: ${condition}`;
                document.getElementById('wind_mph').innerText = `Wind Speed ${wind_mph} MPH`;
                document.getElementById('wind_dir').innerText = `Wind Direction ${wind_dir}`;

                const messageElement = document.getElementById('weatherMessage');
                // Check the condition and update the messageElement's text
                messageElement.innerText = condition.includes('rain') ? "Better grab the umbrella, it's not looking great." : "It's a nice day out for a bike ride!";

                if (city === document.getElementById('cityInput').value) {
                    // Hide the initial search form
                    document.getElementById('searchForm').style.display = 'none';

                    // Create a new search form
                    const newSearchForm = document.createElement('form');
                    newSearchForm.id = 'searchForm2'; // Set the ID for the new form
                    newSearchForm.innerHTML = `
                        <p>Check another location?</p>
                        <input type="text" id="cityInput2" placeholder="Enter your address">
                        <button class="btn btn-lg btn-light fw-bold border-white bg-white" type="submit">Search</button>
                    `;

                    // Add the new search form to the DOM
                    document.body.appendChild(newSearchForm);

                    // Show the searchForm2
                    document.getElementById('searchForm2').style.display = 'block';
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }
});
