const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_ICON_PREFIX_URL = 'https://openweathermap.org/img/w';
const API_KEY = '69518b1f8f16c35f8705550dc4161056';

async function handleWeather() {
  const city = document.querySelector('.city-search').value;
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&q=' +
      city,
  );
  const result = await response.json();
  console.log(result);
}
