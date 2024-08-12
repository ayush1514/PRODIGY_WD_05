const apiKey = 'c2437562f260b0cafe11da00c28e117b'; // Replace with your OpenWeatherMap API key

// Fetch weather by geolocation
function fetchWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

// Fetch weather by user input
function fetchWeatherByInput() {
    const location = document.getElementById('location-input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

// Display weather data
function displayWeather(data) {
    if (data.cod === 200) {
        document.getElementById('location-name').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.querySelector('.weather-info').style.display = 'block';
    } else {
        alert('Location not found!');
    }
}

// Get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
        }, error => {
            console.error('Geolocation error:', error);
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Automatically fetch weather on page load based on geolocation
window.onload = getLocation;