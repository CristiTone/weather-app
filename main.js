const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_ICON_PREFIX_URL = 'https://openweathermap.org/img/w';
const APP_ID = '69518b1f8f16c35f8705550dc4161056';

async function handleWeather() {
  const city = document.querySelector('.city-search').value;
  const loading = document.querySelector('.loading');
  loading.classList.add('display');
  const weather = await getWeather(city);
  loading.classList.remove('display');

  if (weather.cod !== 200) {
    alert(`Ceva nu a mers bine: ${weather.cod} - ${weather.message}`);
  }

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
  const location = document.querySelector('.location')
  const weatherIcon = document.querySelector('.weather-now-icon');
  const degrees = document.querySelector('.degrees');
  const feelsLike = document.querySelector('.feels-like');
  const tempMin = document.querySelector('.temp-min');
  const tempMax = document.querySelector('.temp-max');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const pressure = document.querySelector('.pressure');
  location.innerHTML = `Conditii meteo in: ${weather.name}`
  weatherIcon.src = `${WEATHER_ICON_PREFIX_URL}/${weather.weather[0].icon}.png`;
  degrees.innerHTML = `${Math.round(weather.main.temp)} &#8451`;
  feelsLike.innerHTML = `Temperatura resimtita ${Math.round(
    weather.main.feels_like,
  )} &#8451`;
  tempMin.innerHTML = `Temperatura minima ${Math.round(
    weather.main.temp_min,
  )} &#8451`;
  tempMax.innerHTML = `Temperatura maxima ${Math.round(
    weather.main.temp_max,
  )} &#8451`;
  wind.innerHTML = `Viteza vantului ${weather.wind.speed}`;
  humidity.innerHTML = `Umiditate ${weather.main.humidity}`;
  pressure.innerHTML = `Presiune atmosferica ${weather.main.pressure}`;

  const weatherSection = document.querySelector('.weather');
  weatherSection.style.opacity = 1;
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleWeather();
  }
});

navigator.geolocation.getCurrentPosition((position) => {
  getCurrentPositionWeather(
    position.coords.latitude,
    position.coords.longitude
  );
});

async function getCurrentPositionWeather(lat, lon) {
  const response = await fetch(
    `${WEATHER_URL}?appid=${APP_ID}&units=metric&lat=${lat}&lon=${lon}`
  );
  const result = await response.json();
  showWeather(result);
}
