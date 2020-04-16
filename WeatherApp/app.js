const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

if (location) {
  geocode(location, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    }    

    forecast(latitude, longitude, (error, { description, temperature, feelslike }) => {
      if (error) {
        return console.log(error);
      }
  
      console.log(`It's ${description} in ${location}.`);
      console.log(`The temperature is ${temperature}°C.`);
      console.log(`It feels like ${feelslike}°C.`);
    });
  });
} else {
  console.log("Please provide a location.");
}
