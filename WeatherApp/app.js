const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

if (location) {
  geocode(location, (error, data) => {
    if (error) {
      return console.log(error);
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(`It's ${forecastData.description} in ${data.location}.`);
      console.log(`The temperature is ${forecastData.temperature}°C.`);
      console.log(`It feels like ${forecastData.feelslike}°C.`);
    });
  });
} else {
  console.log("Please provide a location.");
}
