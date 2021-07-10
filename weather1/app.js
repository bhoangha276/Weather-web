let apiKey = "d3e00464c92dd348708f4f38eb169b5b";
let city = 'hanoi';
let units = 'metric'

//get current weather api
async function getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=vi`);
    const data = await response.json();
    const {
        clouds, name, main, wind, visibility, weather
    } = data;
    let temp = Math.floor(main.temp);
    let iconURL = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
    let windSpeedPerHour = Math.floor(wind.speed / 0.277778);
    let vision = (visibility / 1000);
    document.getElementById("location-name").innerHTML = name;
    if (units == 'metric') {
        document.getElementById("temp").innerHTML = `${temp}°C`;
        document.getElementById("feel-like").innerHTML = `Feels like: ${Math.floor(main.feels_like)} °C`;
    } else {
        document.getElementById("temp").innerHTML = `${temp}°F`;
        document.getElementById("feel-like").innerHTML = `Feels like: ${Math.floor(main.feels_like)} °F`;
    }
    document.getElementById("wind").innerHTML = `Wind: ${windSpeedPerHour} Km/h`;
    document.getElementById("vision").innerHTML = `Vision: ${vision} Km`;
    document.getElementById("humidity").innerHTML = `Humidity: ${main.humidity} %`;
    document.getElementById("pressure").innerHTML = `Pressure: ${main.pressure} hPa`;
    document.getElementById("pressure").innerHTML = `Pressure: ${main.pressure} hPa`;
    let a = document.getElementById("weather-icon");
    a.setAttribute("src", iconURL);
}

let searchInput = document.getElementById("txtSearchInput");
let btnSearch = document.getElementById("btnSearch");
let btnTempC = document.getElementById("cencius");
let btnTempF = document.getElementById("fahrenheit");

btnSearch.addEventListener('click', function (e) {
    window.localStorage.setItem('city', searchInput.value);
});
city = window.localStorage.getItem('city');

btnTempF.addEventListener('click', function (e) {
    window.localStorage.removeItem('units');
    window.localStorage.setItem('units', 'imperial');
})
btnTempC.addEventListener('click', function (e) {
    window.localStorage.removeItem('units');
    window.localStorage.setItem('units', 'metric');
})
units = window.localStorage.getItem('units');

getWeather();


//temp(C/F) save in localstorage
//get weather in 4 day