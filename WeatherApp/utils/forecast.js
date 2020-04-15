const request = require("postman-request");

// WeatherStack
const weatherstackToken = "e7cfa6e4807c4a37ac1227a444ee6d6a";

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

const forecast = (latitude, longitude, callback) => {
  const weatherURL =
    "http://api.weatherstack.com/current?access_key=" +
    weatherstackToken +
    "&query=" + latitude + "," + longitude;

    request(weatherURL, { json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined);
        } else if (response.body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                description: response.body.current.weather_descriptions[0],
                location: response.body.location.name,
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
            });
        }
    });
};

module.exports = forecast;