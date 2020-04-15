const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("London", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

forecast(51.50722, -0.1275, (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
