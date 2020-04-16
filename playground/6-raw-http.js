const https = require("https");
const http = require("http");

const url = "http://api.weatherstack.com/current?access_key=e7cfa6e4807c4a37ac1227a444ee6d6a&query=Nice";

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });

});

request.on('error', (error) => {
    console.log("An error", error);
});

request.end();