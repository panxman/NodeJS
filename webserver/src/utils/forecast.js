const request = require("postman-request");

// WeatherStack
const weatherstackToken = "e7cfa6e4807c4a37ac1227a444ee6d6a";

const forecast = (latitude, longitude, callback) => {
  const weatherURL =
    "http://api.weatherstack.com/current?access_key=" +
    weatherstackToken +
    "&query=" + latitude + "," + longitude;

    request(weatherURL, { json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                location: body.location.name,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
            });
        }
    });
};

module.exports = forecast;