const apiKey = '96e0e87ac6aaef8354a531cb50ce455d';

const geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";

const cityName = document.getElementById("cityName");
const mainWeather = document.getElementById("main-weather");
const weatherDescription = document.getElementById("weather-description");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function () {
  if (cityName.value != "") {
    setWeatherDescription(cityName.value);
  }
});

async function getLatLon(city) {
  const url = `${geocodingUrl}${city}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    "lat": data[0].lat,
    "lon": data[0].lon
  };
}

async function getWeather(lat, lon) {
  const url = `${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    "main": data.weather[0].main,
    "description": data.weather[0].description
  };
}

async function setWeatherDescription(city) {
  const coordinateData = await getLatLon(city);
  const lat = coordinateData.lat;
  const lon = coordinateData.lon;
  const weatherData = await getWeather(lat, lon);
  mainWeather.innerHTML = weatherData.main;
  weatherDescription.innerHTML = weatherData.description;
}
