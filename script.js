let form = document.querySelector('#form');
let input = document.querySelector('#search-input');

const API_geocoding = "http://api.openweathermap.org/geo/1.0/direct?appid=c2739a853444cbe3aa2911ba4027c292&q=";
//const API_key = "c2739a853444cbe3aa2911ba4027c292"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let weatherStatus;
let degree;
let city;
let country;
let day; 
let month; 
let year;


form.addEventListener('submit', event => {
    event.preventDefault();
    const data = input.value;
    console.log(data);
    const url = API_geocoding + data;
    console.log(url);
    getWeatherData(API_geocoding + data);
});

function getWeatherData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        lat = data[0].lat;
        lon = data[0].lon;
        city = data[0].name;
        country = data[0].country;
        console.log(city);
        console.log(country);
        return arr = [lat, lon];
    })
    .then(arr => {
        const API_forecast = "https://api.openweathermap.org/data/2.5/weather?lat=" + arr[0] + "&lon=" + arr[1] + "&appid=c2739a853444cbe3aa2911ba4027c292";
        fetch(API_forecast)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            weatherStatus = capitalize(data.weather[0].description);
            degree = parseInt(data.main.temp - 272.15);

            const current = new Date();
            day = dayNames[current.getDay()];
            date = current.getDate();
            month = monthNames[current.getMonth()];
            year = current.getFullYear();

            let currentDate = day + ", " + month + " " + date + " " + year;

            console.log(weatherStatus);
            console.log(degree);

            let location = city + ", " + country;
            document.querySelector('#degree').innerHTML = degree + '<sup>o</sup> C';
            document.querySelector('#weather-status').innerHTML = weatherStatus;
            document.querySelector('#location').innerHTML = location;
            document.querySelector('#date').innerHTML = currentDate;
            console.log(day);
        });
    })
}

function capitalize(string) {
    let arr = string.split(' ');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    let result = arr.join(' ');
    return result;
}
