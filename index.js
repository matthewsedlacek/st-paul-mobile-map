document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

// MAP
let mymap = L.map("mapid").setView([44.947479, -93.091638], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    // put mapbox access token here
    accessToken:
      "pk.eyJ1IjoibWF0dHNlZDE5OTEiLCJhIjoiY2tlYWRyZzFoMDI4cDJzcHU3ZzJuNnFrdiJ9.r94ih7yPhMDQ8UB8X80zLA",
  }
).addTo(mymap);

// MAP COUNTER MARKERS (Examples from previous project)
// const burke_gilman_counter = L.marker([47.679359, -122.263684]).addTo(mymap);
// burke_gilman_counter.bindPopup("Burke Gilman Bike Counter");
// const elliott_bay_counter = L.marker([47.618844, -122.359963]).addTo(mymap);
// elliott_bay_counter.bindPopup("Elliott Bay Bike Counter");
// const ship_canal_counter = L.marker([47.648119, -122.349855]).addTo(mymap);
// ship_canal_counter.bindPopup("Ship Canal Bike Counter");
// const mts_counter = L.marker([47.590748, -122.288702]).addTo(mymap);
// mts_counter.bindPopup("Mountain To Sound Bike Counter");

// WEATHER
function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32);
  var description = d.weather[0].description;

  document.getElementById("description").innerHTML = description;
  document.getElementById("temp").innerHTML = fahrenheit + "&deg;";
  document.getElementById("location").innerHTML = d.name;

  if (description.indexOf("rain") > 0) {
    document.querySelector(".weather").className = "rainy";
  } else if (description.indexOf("cloud") > 0) {
    document.querySelector("#weather").className = "cloudy";
  } else if (description.indexOf("sunny") > 0) {
    document.querySelector(".weather").className = "sunny";
  }
}

function weatherBalloon() {
  var key = "0adec15f5303cb5a41696c127460d8f9";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Saint Paul&appid=" + key
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      drawWeather(data);
    })
    .catch(function () {
      // catch any errors
    });
}

window.onload = function () {
  weatherBalloon("St Paul, MN");
};
