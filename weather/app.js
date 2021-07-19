
let apiKey = "d3e00464c92dd348708f4f38eb169b5b";
let units = 'metric';
if (window.localStorage.hasOwnProperty('location')) {
    let city = window.localStorage.getItem('location');
    if (window.localStorage.hasOwnProperty('units')) {
        let units = window.localStorage.getItem('units');
        getWeather(city, units)
    }
    else {
        getWeather(city, 'metric');
    }
}
else {
    getLocation();
}


//get current weather api
async function getWeather(city, units) {
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
    document.getElementById("wind").innerHTML = `${windSpeedPerHour} Km/h`;
    document.getElementById("vision").innerHTML = `${vision} Km`;
    document.getElementById("humidity").innerHTML = `${main.humidity}%`;
    document.getElementById("pressure").innerHTML = `${main.pressure} hPa`;
    let a = document.getElementById("weather-icon");
    a.setAttribute("src", iconURL);
    getWeatherDays(latitude, longitude, units);
}

let searchInput = document.getElementById("txtSearchInput");
let btnSearch = document.getElementById("btnSearch");
let btnTempC = document.getElementById("cencius");
let btnTempF = document.getElementById("fahrenheit");
let personalizedSearch = document.getElementById('txtPerson');

// btnSearch.addEventListener('click', function (e) {
//     let city = document.getElementById("location-name").value;
//     getWeather(city);
// });
document.getElementById('searchForm').addEventListener('submit', e => {
    e.preventDefault();
    let city = removeVietnameseTones(searchInput.value);
    window.localStorage.setItem('location', city);
    if (window.localStorage.hasOwnProperty('units')) {
        let units = window.localStorage.getItem('units');
        getWeather(city, units)
    }
    else {
        getWeather(city, 'metric');
    }
})

btnTempF.addEventListener('click', function (e) {
    window.localStorage.removeItem('units');
    window.localStorage.setItem('units', 'imperial');
})
btnTempC.addEventListener('click', function (e) {
    window.localStorage.removeItem('units');
    window.localStorage.setItem('units', 'metric');
})

async function getLocation() {
    const response = await fetch(`https://freegeoip.app/json/?fbclid=IwAR1xwY_g3DYFcaH7T1YfX96z4cdJ433xCVmHotkqBpS_Et8rKD5FADarb7I`);
    const data = await response.json();
    const {
        city, latitude, longitude
    } = data;
    if (window.localStorage.hasOwnProperty('units')) {
        let units = window.localStorage.getItem('units');
        getWeather(city, units)
    }
    else {
        getWeather(city, 'metric');
    }
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

function hourConverter(dt) {
    var a = new Date(dt * 1000);
    var hour = a.getHours();
    var minute = a.getMinutes();
    var time = hour + ':00';
    return time;
}

async function getWeatherDays(lat, lon, units) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=d3e00464c92dd348708f4f38eb169b5b&units=${units}`);
    const data = await response.json();
    const {
        daily, hourly
    } = data;
    document.getElementById("dew-point").innerHTML = `${daily[0].dew_point}°`;
    if (units == 'metric') {
        for (let i = 1; i < 8; i++) {
            let unixTime = daily[i].dt;
            let dailyMaxTemp = daily[i].temp.max;
            let dailyMinTemp = daily[i].temp.min;
            let dailyImg = document.getElementById(`icon${String(i)}`);
            let iconURL = `http://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`;
            document.getElementById(`date${String(i)}`).innerHTML = timeConverter(unixTime);
            dailyImg.setAttribute("src", iconURL);
            document.getElementById(`maxTemp${String(i)}`).innerHTML = `${Math.floor(dailyMaxTemp)}°C`;
            document.getElementById(`minTemp${String(i)}`).innerHTML = `${Math.floor(dailyMinTemp)}°C`;
        }
    } else {
        for (let i = 1; i < 8; i++) {
            let unixTime = daily[i].dt;
            let dailyMaxTemp = daily[i].temp.max;
            let dailyMinTemp = daily[i].temp.min;
            let dailyImg = document.getElementById(`icon${String(i)}`);
            let iconURL = `http://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`;
            document.getElementById(`date${String(i)}`).innerHTML = timeConverter(unixTime);
            dailyImg.setAttribute("src", iconURL);
            document.getElementById(`maxTemp${String(i)}`).innerHTML = `${Math.floor(dailyMaxTemp)}°F`;
            document.getElementById(`minTemp${String(i)}`).innerHTML = `${Math.floor(dailyMinTemp)}°F`;
        }
    }

    for (let j = 0; j <= 12; j++) {
        let unixHour = hourly[j].dt;
        let hourlyRain = hourly[j].humidity;
        document.getElementById(`hour${j}`).innerHTML = hourConverter(unixHour);
        document.getElementById(`rain${j}`).innerHTML = `<i class="fas fa-tint fa-xs"></i>${hourlyRain}%`;
    }
}

var personals = [];
var index = -1;
function addPersonals() {
    let personal = personalizedSearch.value;
    personals.push(personal);
    window.localStorage.setItem('personals', personals);
    let per = window.localStorage.getItem('personals');
    index++;
        console.log(index);
        getWeatherByPer(personal, index);
    }




async function getWeatherByPer(city, index) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const {
        name, main, weather
    } = data;
    let iconURL = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
    console.log(`location${index}`);
    document.getElementById(`location${index}`).innerHTML = name;
    let img = document.getElementById(`iconBody${index}`);
    img.setAttribute("src", iconURL);
    document.getElementById(`tempBody${index}`).innerHTML = `${main.temp}°C`;
}



function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}