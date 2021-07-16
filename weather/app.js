// let apiKey = "d3e00464c92dd348708f4f38eb169b5b";
// let city = 'hanoi';
// let units = 'metric'

// //get current weather api
// async function getWeather() {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=vi`);
//     const data = await response.json();
//     const {
//         clouds, name, main, wind, visibility, weather
//     } = data;
//     let temp = Math.floor(main.temp);
//     let iconURL = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
//     let windSpeedPerHour = Math.floor(wind.speed / 0.277778);
//     let vision = (visibility / 1000);
//     document.getElementById("location-name").innerHTML = name;
//     if (units == 'metric') {
//         document.getElementById("temp").innerHTML = `${temp}°C`;
//         document.getElementById("feel-like").innerHTML = ` ${Math.floor(main.feels_like)} °C`;
//     } else {
//         document.getElementById("temp").innerHTML = `${temp}°F`;
//         document.getElementById("feel-like").innerHTML = ` ${Math.floor(main.feels_like)} °F`;
//     }
//     document.getElementById("wind").innerHTML = ` ${windSpeedPerHour} Km/h`;
//     document.getElementById("vision").innerHTML = ` ${vision} Km`;
//     document.getElementById("humidity").innerHTML = ` ${main.humidity}%`;
//     document.getElementById("pressure").innerHTML = ` ${main.pressure} hPa`;
//     document.getElementById("pressure").innerHTML = ` ${main.pressure} hPa`;
//     let a = document.getElementById("weather-icon");
//     a.setAttribute("src", iconURL);
// }

// let searchInput = document.getElementById("txtSearchInput");
// let btnSearch = document.getElementById("btnSearch");
// let btnTempC = document.getElementById("cencius");
// let btnTempF = document.getElementById("fahrenheit");

// btnSearch.addEventListener('click', function (e) {
//     window.localStorage.setItem('city', searchInput.value);
//     console.log('1')
// });
// city = window.localStorage.getItem('city');

// btnTempF.addEventListener('click', function (e) {
//     window.localStorage.removeItem('units');
//     window.localStorage.setItem('units', 'imperial');
// })
// btnTempC.addEventListener('click', function (e) {
//     window.localStorage.removeItem('units');
//     window.localStorage.setItem('units', 'metric');
// })
// units = window.localStorage.getItem('units');

// getWeather();


//temp(C/F) save in localstorage
//get weather in 4 day

let apiKey = "d3e00464c92dd348708f4f38eb169b5b";
let units = 'metric';
getLocation();

//get current weather api
async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
    const data = await response.json();
    const {
        clouds, name, main, wind, visibility, weather, coord
    } = data;
    let temp = Math.floor(main.temp);
    let iconURL = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
    let windSpeedPerHour = Math.floor(wind.speed / 0.277778);
    let vision = (visibility / 1000);
    let latitude = coord.lat;
    let longitude = coord.lon;
    console.log("lat", latitude);
    document.getElementById("location-name").innerHTML = name;
    if (units == 'metric') {
        document.getElementById("temp").innerHTML = `${temp}°C`;
        document.getElementById("feel-like").innerHTML = `${Math.floor(main.feels_like)}°C`;
    } else {
        document.getElementById("temp").innerHTML = `${temp}°F`;
        document.getElementById("feel-like").innerHTML = `${Math.floor(main.feels_like)}°F`;
    }
    document.getElementById("wind").innerHTML = `${windSpeedPerHour}Km/h`;
    document.getElementById("vision").innerHTML = `${vision}Km`;
    document.getElementById("humidity").innerHTML = `${main.humidity}%`;
    document.getElementById("pressure").innerHTML = `${main.pressure}hPa`;
    document.getElementById("pressure").innerHTML = `${main.pressure}hPa`;
    let a = document.getElementById("weather-icon");
    a.setAttribute("src", iconURL);
    getWeatherDays(latitude, longitude);
}

let searchInput = document.getElementById("txtSearchInput");
let btnSearch = document.getElementById("btnSearch");
let btnTempC = document.getElementById("cencius");
let btnTempF = document.getElementById("fahrenheit");


// btnSearch.addEventListener('click', function (e) {
//     let city = document.getElementById("location-name").value;
//     getWeather(city);
// });
document.getElementById('searchForm').addEventListener('submit', e => {
    e.preventDefault();
    let city = searchInput.value;
    getWeather(city);
})

btnTempF.addEventListener('click', function (e) {
    window.localStorage.removeItem('units');
    window.localStorage.setItem('units', 'imperial');
})
btnTempC.addEventListener('click', function (e) {
    window.localStorage.removeItem('units');
    window.localStorage.setItem('units', 'metric');
})
units = window.localStorage.getItem('units');

async function getLocation() {
    const response = await fetch(`https://freegeoip.app/json/?fbclid=IwAR1xwY_g3DYFcaH7T1YfX96z4cdJ433xCVmHotkqBpS_Et8rKD5FADarb7I`);
    const data = await response.json();
    const {
        city, latitude, longitude
    } = data;
    getWeather(city);
}

function timeConverter(dt) {
    var a = new Date(dt * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
}

async function getWeatherDays(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=d3e00464c92dd348708f4f38eb169b5b&units=metric`);
    const data = await response.json();
    const {
        daily
    } = data;
    for (let i = 1; i < 8; i++) {
        let unixTime = daily[i].dt;
        let dailyMaxTemp = daily[i].temp.max;
        let dailyMinTemp = daily[i].temp.min;
        let dailyImg = document.getElementById(`icon${String(i)}`);
        let iconURL = `http://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`;
        document.getElementById(`date${String(i)}`).innerHTML = timeConverter(unixTime);
        dailyImg.setAttribute("src", iconURL);
        document.getElementById(`maxTemp${String(i)}`).innerHTML = `${dailyMaxTemp}°C`;
        document.getElementById(`minTemp${String(i)}`).innerHTML = `${dailyMinTemp}°C`;

    }
}

