const path = require("path");
const express = require("express");

const app = express();
const publicDir = path.join(__dirname, "../public");

// Set Handlebars as the View Engine / templates
app.set("view engine", "hbs");
// Use public folder for the static content
app.use(express.static(publicDir));

// Routes
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
        helpMsg: "This is a page to provide a help message. Hjelp Hjelp."
    })
})

// app.com/weather
app.get("/weather", (req, res) => {
    res.send({
        forecast: "Overcast",
        location: "Melbourne",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
