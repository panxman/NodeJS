const request = require('postman-request');

// WeatherStack
const weatherstackToken = "e7cfa6e4807c4a37ac1227a444ee6d6a";
const url = "http://api.weatherstack.com/current?access_key=" + weatherstackToken + "&query=Paris";
// MapBox
const mapboxToken = "pk.eyJ1IjoicGFueG1hbjEiLCJhIjoiY2s4d2lrcnVhMGhlejNuc2I1dzhoZHJpNiJ9.vil0yuQud56QuaJ-GmLkow"
const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Paris.json?access_token=" + mapboxToken;


request(url, { json: true }, (error, response) => {
    if (error) {
        console.log("Unable to connect to weather service.");
    } else if (response.body.error) {
        console.log("Unable to find location.");
    } else {
        console.log(`It's ${response.body.current.weather_descriptions[0]} in ${response.body.location.name}.`)
        console.log(`The temperature is ${response.body.current.temperature}°C.`);
        console.log(`It feels like ${response.body.current.feelslike}°C.`);
    }    
});


request(geocodeURL, { json: true }, (error, response) => {
    if (error) {
        console.log("Unable to connect to MapBox Geocoding.");
        console.log("Please check your internet connection and try again.");
    } else if (!response.body.features) {
        console.log("Unable to find geocoding for given location.");
    } else {
        const latitude = response.body.features[0].center[1];
        const longtitude = response.body.features[0].center[0];
        
        console.log(response.body.features[0].place_name + ": ");
        console.log(latitude + " - " + longtitude);
    }    
});