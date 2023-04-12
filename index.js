// const fetchCurrentWeather = async (url) => {
//     const response = await fetch(url);
//     currentWeather = await response.json();
//     return renderCurrentWeather(currentWeather);
// }
function fetchCurrentWeather (url){
    fetch(url)
    .then(response=>response.json())
    .then(data=> renderCurrentWeather(data));
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".card").style = "margin-top:5%"
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            document.querySelector(".geo").innerHTML = "<h6>Latitude: <span style=\"color: cyan;\" >" + lat + "</span> </h6><h6> " + "Longitude: " + long + ".</h6>";
            
             fetchCurrentWeather("http://api.weatherapi.com/v1/current.json?key=2d66208f6e624794bbc92139221612&q=" + lat +"," + long + "&aqi=no"); 
        })
    }
    document.querySelector("form").addEventListener("submit", (e)=>{
        e.preventDefault();
        const cityName = document.querySelector("#citySearch").value;
        
         fetchCurrentWeather("http://api.weatherapi.com/v1/current.json?key=2d66208f6e624794bbc92139221612&q=" + cityName + "&aqi=no");
    })
})
function renderCurrentWeather(data) {
    
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
    document.querySelector("#weather-status").innerHTML = `<span id=\"weather-status-value\" style=\"color:darkcyan\">${data.text}</span>`;
    document.querySelector("#weather-icon").src = data.icon;

}
function updateTemperatureDetails(data){
    document.querySelector("#temperature").innerHTML = "<span style=\"color: olivedrab\"> <span id=\"tempValue\">"+data.temp_c+"</span>&degC</span>";
}
function updateWeatherDetails(data){
    document.querySelector("#windSpeed").innerHTML = "<span style=\"color: olivedrab\"> <span id=\"windSpeedValue\">"+data.wind_kph + " </span>km/h</span>"
    document.querySelector("#humidity").innerHTML = "<span style=\"color: olivedrab\"> "+data.humidity + " %</span>";
    document.querySelector("#pressure").innerHTML = "<span style=\"color: olivedrab\"> "+data.pressure_in + " Inches</span>"
    document.querySelector("#windDirection").innerHTML = "<span style=\"color: olivedrab\"> "+data.wind_dir+"</span>";
    document.querySelector("#uvIndex").innerHTML = "<span style=\"color: olivedrab\"> "+data.uv; 
    document.querySelector("#windGust").innerHTML = "<span style=\"color: olivedrab\"> "+data.gust_kph + " km/h</span>";
    document.querySelector("#precip").innerHTML = "<span style=\"color: olivedrab\"> <span id=\"precipValue\">"+data.precip_mm + "</span> mm</span>";
    return recommendationGenerator();
}
function recommendationGenerator(){
    const uvIndexValue = Number(document.querySelector("#uvIndex").textContent);
    const recommendationDiv = document.querySelector("#recommendations");
    const tempValue = Number(document.querySelector("#tempValue").textContent);
    const weatherStatusValue =document.querySelector("#weather-status-value").textContent;
    const precipValue = Number(document.querySelector("#precipValue").textContent);
    if (uvIndexValue < 5 && tempValue < 20){
        recommendationDiv.innerHTML=`<i class="fa fa-bell" style="color: rgb(47, 184, 88)" aria-hidden="true"></i> <p>The Weather is cold outside, please keep warm</p>`;
    }
    else if(uvIndexValue >= 6 && uvIndexValue <= 7 || tempValue > 20 && tempValue <= 28 ){
        recommendationDiv.innerHTML = `<i class="fa fa-bell" style="color: rgb(47, 184, 88)" aria-hidden="true"></i> <p>It is a beautiful day to go for a outside. Remember to stay hydrated</p>`
    }else if (uvIndexValue > 8 && tempValue > 28){
        recommendationDiv.innerHTML = `<i class="fa fa-bell" style="color: rgb(47, 184, 88)" aria-hidden="true"></i> <p>The weather is harshly hot. Do not stay in the sun for too long. Applying sunscreen regularly is advisable</p>`
    }else if(weatherStatusValue === "rainy" && precipValue > 0  ){
        recommendationDiv.innerHTML = `<i class="fa fa-bell" style="color: rgb(47, 184, 88)" aria-hidden="true"></i> <p>Looks Like it is going to rain soon. Grab your coat and umbrella before heading out.</p>`
    }else {
        recommendationDiv.innerHTML = `<i class="fa fa-bell" style="color: rgb(47, 184, 88)" aria-hidden="true"></i> <p>The weather is perfect today.</p>`
    }
   
}
