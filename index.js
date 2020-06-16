
// GOOGLE MAPS API CALL   
// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 13,
//         center: {lat: 47.6062, lng: -122.3321}
//     });
    
//     var bikeLayer = new google.maps.BicyclingLayer();
//     bikeLayer.setMap(map);
// }

    
// WEATHER
function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	var description = d.weather[0].description;
	
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
	document.getElementById('location').innerHTML = d.name;
	
	if( description.indexOf('rain') > 0 ) {
  	document.querySelector(".weather").className = 'rainy';
  } else if( description.indexOf('cloud') > 0 ) {
  	document.querySelector("#weather").className = 'cloudy';
  } else if( description.indexOf('sunny') > 0 ) {
  	document.querySelector(".weather").className = 'sunny';
  }
}

function weatherBalloon() {
    var key = '0adec15f5303cb5a41696c127460d8f9';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        drawWeather(data);
    })
    .catch(function() {
        // catch any errors
    });
}

window.onload = function() {
    weatherBalloon( "Seattle,WA" );
}


//MESSAGES
// const msgContainer = document.querySelector("#messages")
const msgTabs = document.querySelector("#associated-trails")
const msgSection = document.querySelector("#messages")
// const messages = document.querySelector(".messages")
const form = document.querySelector(".message-form")


document.addEventListener("DOMContentLoaded", (event) => {
    console.log('DOM fully loaded and parsed')

    getMessage()
})


function getMessage(){
    fetch("http://localhost:3000/messages")
    .then(resp => resp.json())
    .then(json => 
        json.forEach(message => renderMessage(message))
        )
}

function renderMessage(message){
    const div = document.createElement("div")
    div.className = "msgCard"
    div.hidden = true
    
    const user_name = document.createElement("li")
    user_name.innerText = message.user_name

    const msg = document.createElement("p")
    msg.innerText = message.content

    const bikeTrail = document.createElement("li")
    bikeTrail.id = message.bike_trail_id
    bikeTrail.innerText = message.bike_trail_id
    bikeTrailListener(bikeTrail, div)
    
    msgSection.appendChild(messages)
    div.append(bikeTrail, user_name, msg)
    messages.appendChild(div)
    msgTabs.append(bikeTrail)
}

function bikeTrailListener(bikeTrail, div) {
    bikeTrail.addEventListener("click", (e) => {
        const cards = document.querySelectorAll(".msgCard")
        cards.forEach(card => card.hidden = true)
        div.hidden = false

        const hiddenInput = document.querySelector(".message-form").childNodes[1]
        const trailInput = document.createElement("input")
        trailInput.type="hidden"
        trailInput.id= `${bikeTrail.id}`
        trailInput.name= `${bikeTrail.id}`
        form.replaceChild(trailInput, hiddenInput)
        addMessage(bikeTrail)
    })
}

function addMessage(bikeTrail){
    const userInput = document.querySelector(".user_name-input")
    const msgInput = document.querySelector(".message-input")
    const postBtn = document.querySelector(".message-button")
    const newUser = document.createElement("li")
    const newMsg = document.createElement("p")
    const newTrail = bikeTrail.id

    postBtn.addEventListener("click", (e) => {
        e.preventDefault()
        newUser.innerText = userInput.value
        userInput.value = ""
        newMsg.innerText = msgInput.value
        msgInput.value = ""
        postMessage(newUser, newMsg, newTrail)
    })
}

function postMessage(newUser, newMsg, newTrail){
    fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "applicaiton/json "
        },
        body: JSON.stringify({
            "user_name": newUser.innerText,
            "content": newMsg.innerText,
            "bike_trail_id": newTrail
        })
    })
    // .then(resp => resp.json())
    // .then(json => console.log(json))
}

// TRAIL DATA
const trailDataCard = document.querySelector("#trail-data")
const pathSelector = document.querySelector("#path-selector")

// fetch bike trail data
function getBikeTrailData(bikeTrailId) {
   fetch("http://localhost:3000/bike_trails/" + bikeTrailId)
   .then(resp => resp.json())
   .then(json => console.log(json)) 
}
// format it, hide it
function renderBikeTrailData(data) {
    const trailName = data["data"]["attributes"]["name"]
    const trailDistance = data["data"]["attributes"]["distance"]
    const trailType = data["data"]["attributes"]["trail_type"]

    const trailNameDropdown = document.createElement("li")
    trailNameDropdown.innerHTML = <a href="#"></a>
    trailNameDropdown.innerText = trailName 
    pathSelector.appendChild(trailNameDropdown)

    data["data"]



}
// make it identifiable so that when you select a trail it can appear



// BIKE PATH LISTENERS AND SELECTORS
const pathDropdown = document.querySelector("#path-selector")
pathDropdown.children.forEach(path => {
	path.addEventListener('click', (e) => {

    })
})

