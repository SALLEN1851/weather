const url = "https://api.weatherapi.com/v1/current.json?q=47346&lang=en&key=7c633cfa7ae8424fb3b02508232408";

fetch(url)
    .then(response => response.json())
    .then(data => {
        const temperature = data.current.temp_f;
        const condition = data.current.condition.text.toLowerCase();

        document.getElementById('temperature').innerText = `Current temperature: ${temperature}°F`;

        document.getElementById('condition').innerText = `Current condition: ${condition}`;

            // Select the HTML element by its ID
            const messageElement = document.getElementById('weatherMessage');

            // Check the condition and update the messageElement's text
            if (condition.includes('rain')) {
                messageElement.innerText = "Grab the umbrella";
            } else {
                messageElement.innerText = "It's a nice day to ride a bike";
            }
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });





