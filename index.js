document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".wrapper").style = "margin-top:20%"
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            document.querySelector(".geo").innerHTML = "<h6>Latitude: <span style=\"color: cyan;\" >" + lat + "</span> </h6><h6> " + "Longitude: " + long + ".</h6>";

            return fetchCurrentWeather("http://api.weatherapi.com/v1/current.json?key=2d66208f6e624794bbc92139221612&q=" + lat +"," + long + "&aqi=no"); 
        })
    }
})

const fetchCurrentWeather = async (url) => {
    const response = await fetch(url);
    currentWeather = await response.json();
    return renderCurrentWeather(currentWeather);
}

function renderCurrentWeather(data) {
    console.log (data);
    updateCurrentLocation(data.location);
    updateWeatherStatus(data.current.condition);
    updateTemperatureDetails(data.current);
    updateWeatherDetails(data.current);
}
function updateCurrentLocation(data){
    document.querySelector("#city").innerHTML= `<span style=\"color: cyan;\" >${data.name}</span> , <span style=\"color: orange;\" >${data.country}</span>`;
    document.querySelector("#date").innerHTML= `Date: <span style=\"color: cyan;\" >${data.localtime}</span>`
    document.querySelector(".geo").innerHTML = "<h6>Latitude: <span style=\"color: cyan;\" >" + data.lat + "</span> </h6><h6> " + "Longitude: <span style=\"color: cyan;\" >" + data.lon + "</span></h6>";
    
}
function updateWeatherStatus(data){
    document.querySelector("#weather-status").innerHTML = `<span style=\"color:orange\">${data.text}</span>`;
    document.querySelector(".weather-icon").src = data.icon;

}
function updateTemperatureDetails(data){
    document.querySelector("#temperature").innerHTML = data.feelslike_c;
}
function updateWeatherDetails(data){
    document.querySelector(".windspeed").innerHTML = data.wind_kph + " km/h"
    document.querySelector(".humidity").innerHTML = data.humidity + " %";
    document.querySelector(".pressure").innerHTML = data.pressure_in + " hPa"
    document.querySelector(".windDirection").innerHTML = data.wind_dir;
    document.querySelector(".uvIndex").innerHTML = data.uv; 
    document.querySelector(".windGust").innerHTML = data.gust_kph + " km/h";
}