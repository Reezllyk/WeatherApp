const apiKey = '75de2fc9e661b2c48a1c273f4428cb3c';
const apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const card = document.querySelector('.card');

let data;

function isNightLocal() {
    const hour = new Date().getHours();
    return hour >= 18 || hour <= 6;
}

function isNightInCity() {
    if (!data || !data.dt || !data.timezone) return isNightLocal();
    const localTime = new Date((data.dt + data.timezone) * 1000);
    const hour = localTime.getHours();
    return hour >= 18 || hour <= 6;
}

const checkDayIcon = () => {
    if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'images/svg/day/clouds.svg';
    } else if (data.weather[0].main === 'Clear') {
        weatherIcon.src = 'images/svg/day/clear.svg';
    } else if (data.weather[0].main === 'Rain') {
        weatherIcon.src = 'images/svg/day/rain.svg';
    } else if (data.weather[0].main === 'Drizzle') {
        weatherIcon.src = 'images/svg/day/drizzle.svg';
    } else if (data.weather[0].main === 'Mist') {
        weatherIcon.src = 'images/svg/day/mist.svg';
    } else if (data.weather[0].main === 'Snow') {
        weatherIcon.src = 'images/svg/day/snow.svg';
    }
};
const checkNightIcon = () => {
    if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'images/svg/night/clouds-night.svg';
    } else if (data.weather[0].main === 'Clear') {
        weatherIcon.src = 'images/svg/night/clear-night.svg';
    } else if (data.weather[0].main === 'Rain') {
        weatherIcon.src = 'images/svg/night/rain-night.svg';
    } else if (data.weather[0].main === 'Drizzle') {
        weatherIcon.src = 'images/svg/night/drizzle-night.svg';
    } else if (data.weather[0].main === 'Mist') {
        weatherIcon.src = 'images/svg/night/mist-night.svg';
    } else if (data.weather[0].main === 'Snow') {
        weatherIcon.src = 'images/svg/night/snow-night.svg';
    }
};

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        data = await response.json();

        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML =
            Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML =
            data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        if (isNightInCity()) {
            checkNightIcon();
            card.classList.add('night');
        } else {
            checkDayIcon();
            card.classList.remove('night');
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

window.addEventListener('load', () => {
    if (isNightLocal()) {
        card.classList.add('night');
        weatherIcon.src = 'images/svg/night/clouds-night.svg'; 
    } else {
        card.classList.remove('night');
        weatherIcon.src = 'images/svg/day/clouds.svg'; 
    }
});
