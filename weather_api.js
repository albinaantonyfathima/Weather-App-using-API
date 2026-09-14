async function getWeather() {
    try {
        let city = document.getElementById("cityInput").value.trim();

        if (city === "") {
            alert("Enter city name");
            return;
        }

        let location = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        let locationData = await location.json();

        if (!locationData.results || locationData.results.length === 0) {
            alert("City not found");
            return;
        }

        let latitude = locationData.results[0].latitude;
        let longitude = locationData.results[0].longitude;
        let cityName = locationData.results[0].name;

        let response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
        );

        let data = await response.json();

        let temperature = data.current.temperature_2m;
        let wind = data.current.wind_speed_10m;

        document.getElementById("cityName").innerText = cityName;
        document.getElementById("temperature").innerText = temperature;
        document.getElementById("wind").innerText = wind + " km/h";
        document.getElementById("temp").innerText = temperature;

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}