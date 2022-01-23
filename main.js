window.addEventListener('DOMContentLoaded', ()=>{
    let now = new Date();
    let date = document.querySelector('.today');
    date.innerHTML = showDate(now);

    let time = document.querySelector('.time');
    time.innerHTML = showTime(now);
})

const api = {
    url: 'https://api.openweathermap.org/data/2.5/',
    key: 'b0525a65121bd434ba301b1fa79e753c'
};
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener("keypress", setQuery);

let searchBtn = document.querySelector('.bx-search-alt');
searchBtn.addEventListener('click', setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchInput.value);
    }
}
function getResults(query){
    fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
        return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('.place-name')
    city.innerHTML = `${weather.name}, ${weather.sys.country}`
    
    let temperature = document.querySelector('.temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span><sup>o</sup>C</span>`;

    let maxTemp = document.querySelector('.max-temp');
    maxTemp.innerHTML = `${Math.round(weather.main.temp_max)}<span><sup>o</sup>C</span><p>Max</p>`;

    let weatherType = document.querySelector('.type');
    weatherType.innerHTML = `${weather.weather[0].main}`;
    
    let minTemp = document.querySelector('.min-temp');
    minTemp.innerHTML = `${Math.round(weather.main.temp_min)}<span><sup>o</sup>C</span><p>Min</p>`;
}
function showDate(d){
    const months = ['January','February','March','April','May','June','July','Avgust','September','October','November','December'];
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    let month = d.getMonth();
    let monthName = months[month];
    let day = d.getDay();
    let dayName = days[day];
    let fullDate = dayName + ", " + d.getDate() +"-"+ monthName;
    return fullDate;
}
function showTime(t){
    let hour =  t.getHours();
    let min = t.getMinutes();
    return hour + ":" + min;
}