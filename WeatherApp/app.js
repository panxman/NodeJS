const request = require('postman-request');

const url = "http://api.weatherstack.com/current?access_key=e7cfa6e4807c4a37ac1227a444ee6d6a&query=Paris";

request(url, { json: true }, (error, response) => {
    console.log(response.body.current);
});