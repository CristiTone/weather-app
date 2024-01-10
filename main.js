const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_ICON_PREFIX_URL = 'https://openweathermap.org/img/w';
const APP_ID = '69518b1f8f16c35f8705550dc4161056';

async function handleWeather() {
  const city = document.querySelector('.city-search').value;
  const weather = await getWeather(city);
  showWeather(weather);
}

async function getWeather(city) {
  const response = await fetch(
    `${WEATHER_URL}?appid=${APP_ID}&units=metric&q=${city}`,
  );
  const result = await response.json();
  return result;
}

function showWeather(weather) {
  const weatherIcon = document.querySelector('.weather .weather-now-icon');
  const degrees = document.querySelector('.degrees');

  weatherIcon.src = `${WEATHER_ICON_PREFIX_URL}/${weather.weather[0].icon}.png`;
  degrees.innerHTML = `${Math.round(weather.main.temp)} &#8451`;
}
