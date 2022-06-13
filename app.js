const express = require("express");
const res = require("express/lib/response");
const https = require("https");
const { stringify } = require("querystring");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
    const apiKey = "f685a59374150095b0e2517ad2f9697b";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        // console.log(response.statusCode);
        response.on("data", function (data) {

            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.send("<img src = " + imgUrl + ">" + "<h1>The Temperature in "+query+" is " + temp + " deg</h1>" + "<h2>Description = " + des + ".</h2>");

            // res.send();
        });
    });
});




app.listen(3000, function () {
    console.log("the server is running perfectly");
});