const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {


  res.sendFile(__dirname + "/index.html");

});
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "50f51ccad99ce2229c916d8f1ad76267";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + unit;
 console.log(url);
  https.get(url, (response) => {

    response.on("data", (data) => {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescrip = weatherData.weather[0].description;


      res.write("<h1>The temperture is : " + temp + "  Celsus </h1>");
      res.write("<p>The weather currently is " + weatherDescrip + "</p>");
      res.send();

    })

  });


});




app.listen(3000, () => {
  console.log("Server running on port 3000");
});
