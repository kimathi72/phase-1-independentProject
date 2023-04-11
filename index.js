document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".card").style = "margin-top:5%"
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            document.querySelector(".geo").innerHTML = "<h6>Latitude: <span style=\"color: cyan;\" >" + lat + "</span> </h6><h6> " + "Longitude: " + long + ".</h6>";

            return fetchCurrentWeather("http://api.weatherapi.com/v1/current.json?key=2d66208f6e624794bbc92139221612&q=" + lat +"," + long + "&aqi=no"); 
        })
    }
    document.querySelector("form").addEventListener("submit", (e)=>{
        e.preventDefault();
        const cityName = document.querySelector("#citySearch").value;
        console.log(cityName);
        return fetchCurrentWeather("http://api.weatherapi.com/v1/current.json?key=2d66208f6e624794bbc92139221612&q=" + cityName + "&aqi=no");
    })
})

const fetchCurrentWeather = async (url) => {
    const response = await fetch(url);
    currentWeather = await response.json();
    return renderCurrentWeather(currentWeather);
}

function renderCurrentWeather(data) {
    console.log(data);
    updateCurrentLocation(data.location);
    updateWeatherStatus(data.current.condition);
    updateTemperatureDetails(data.current);
    updateWeatherDetails(data.current);
}
function updateCurrentLocation(data){
    document.querySelector("#city").innerHTML= `<span style=\"color: orange;\" >${data.name}</span> , <span style=\"color: orange;\" >${data.country}</span>`;
    document.querySelector("#date").innerHTML= data.localtime
    document.querySelector(".geo").innerHTML = "<h6><span style=\"color: darkcyan;\" >Latitude: </span>" + data.lat + " </h6><h6> <span style=\"color: darkcyan;\" >" + "Longitude: </span>" + data.lon + "</h6>";
    
}
function updateWeatherStatus(data){
    document.querySelector("#weather-status").innerHTML = `<span style=\"color:darkcyan\">${data.text}</span>`;
    document.querySelector(".weather-icon").src = data.icon;

}
function updateTemperatureDetails(data){
    document.querySelector("#temperature").innerHTML = "<span style=\"color: olivedrab\"> "+data.temp_c+"&degC</span>";
}
function updateWeatherDetails(data){
    document.querySelector("#windSpeed").innerHTML = "<span style=\"color: olivedrab\"> "+data.wind_kph + " km/h</span>"
    document.querySelector("#humidity").innerHTML = "<span style=\"color: olivedrab\"> "+data.humidity + " %</span>";
    document.querySelector("#pressure").innerHTML = "<span style=\"color: olivedrab\"> "+data.pressure_in + " Inches</span>"
    document.querySelector("#windDirection").innerHTML = "<span style=\"color: olivedrab\"> "+data.wind_dir+"</span>";
    document.querySelector("#uvIndex").innerHTML = "<span style=\"color: olivedrab\"> "+data.uv; 
    document.querySelector("#windGust").innerHTML = "<span style=\"color: olivedrab\"> "+data.gust_kph + " km/h</span>";
    document.querySelector("#precip").innerHTML = "<span style=\"color: olivedrab\"> "+data.precip_mm + " mm</span>";
}