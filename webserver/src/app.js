const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine, views location and handlebars partials
app.set("view engine", "hbs");
app.set("views", viewsPath); // TIP: The default folder should be named: views
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDir));

//~~ Routes ~~
// app.com
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Panos",
  });
});

// app.com/about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Panos",
  });
});

// about.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpMsg: "This is a page to provide a help message. Hjelp Hjelp.",
    name: "Panos",
  });
});

// app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address was provided.",
    });
  }

  // Get lat and lon from the Address
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      // Use lat and lon for the weather forecast
      forecast(
        latitude,
        longitude,
        (error, { description, temperature, feelslike } = {}) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            location,
            description,
            temperature,
            feelslike,
          });
        }
      );
    }
  );
});

// 404 app.com/help/*
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found.",
    name: "Panos",
  });
});

// 404
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found.",
    name: "Panos",
  });
});

// ~~ ~~

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
