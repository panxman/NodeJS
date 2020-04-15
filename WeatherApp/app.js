const geocode = require("./utils/geocode");

// WeatherStack
const weatherstackToken = "e7cfa6e4807c4a37ac1227a444ee6d6a";
const url =
  "http://api.weatherstack.com/current?access_key=" +
  weatherstackToken +
  "&query=Paris";


// request(url, { json: true }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service.");
//     } else if (response.body.error) {
//         console.log("Unable to find location.");
//     } else {
//         console.log(`It's ${response.body.current.weather_descriptions[0]} in ${response.body.location.name}.`)
//         console.log(`The temperature is ${response.body.current.temperature}°C.`);
//         console.log(`It feels like ${response.body.current.feelslike}°C.`);
//     }
// });

// request(geocodeURL, { json: true }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to MapBox Geocoding.");
//         console.log("Please check your internet connection and try again.");
//     } else if (!response.body.features) {
//         console.log("Unable to find geocoding for given location.");
//     } else {
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];

//         console.log(response.body.features[0].place_name + ": ");
//         console.log(latitude + " - " + longitude);
//     }
// });



geocode("London", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
