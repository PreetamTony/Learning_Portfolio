const cityIn = document.getElementById('city');
const btn = document.getElementById('btn');
const err = document.getElementById('error');
const box = document.getElementById('weather');
const nameEl = document.getElementById('name');
const tempEl = document.getElementById('temp');
const humEl = document.getElementById('hum');
const condEl = document.getElementById('cond');

const cache = {};
let lastCity = "";
let timer;

btn.addEventListener('click', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        getWeather();
    }, 500);
});

function getWeather() {
    const city = cityIn.value.trim().toLowerCase();
    
    if (!city) {
        showErr('Please enter a city');
        return;
    }

    if (city === lastCity) return;
    lastCity = city;

    err.classList.add('hide');

    if (cache[city]) {
        displayWeather(cache[city], city);
        return;
    }

    box.classList.add('hide');

    const options = {
        method: 'GET',
        headers: {
            'X-Rapidapi-Key': '464646cba6mshdf3dd46e7168b55p11cfd4jsn16458a1a7a23',
            'X-Rapidapi-Host': 'open-weather13.p.rapidapi.com'
        }
    };

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then(r => r.json())
        .then(geo => {
            if (!geo.results || geo.results.length === 0) throw new Error('Not found');
            const lat = geo.results[0].latitude;
            const lon = geo.results[0].longitude;

            return fetch(`https://open-weather13.p.rapidapi.com/fivedaysforcast?latitude=${lat}&longitude=${lon}&lang=EN`, options);
        })
        .then(res => {
            if (!res.ok) throw new Error('API error');
            return res.json();
        })
        .then(data => {
            cache[city] = data;
            displayWeather(data, city);
        })
        .catch(() => {
            lastCity = "";
            showErr('City not found or API error');
        });
}

function displayWeather(data, city) {
    box.classList.remove('hide');
    nameEl.innerText = data.city && data.city.name ? data.city.name : city;
    const tempC = Math.round(data.list[0].main.temp - 273.15);
    tempEl.innerText = tempC + 'C';
    humEl.innerText = data.list[0].main.humidity;
    condEl.innerText = data.list[0].weather[0].main;
}

function showErr(msg) {
    err.classList.remove('hide');
    err.innerText = msg;
}
