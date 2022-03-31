//jshint esversion :6;
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/signup.html");

});

app.post("/", (req, res) => {

  const firstName = req.body.inputFirstName;
  const lastName = req.body.inputLastName;
  const email = req.body.inputEmail;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]

  };

  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/1023c724cc";
  const options = {
    method: "POST",
    auth: "hichmans:e284827945aba5c33479f5f213280a72-us8"
  }

  const request = https.request(url, options, (response) => {
console.log(response.statusCode);
if (response.statusCode===200 ) {
  res.sendFile(__dirname+ "/success.html");
} else {
  res.sendFile(__dirname+ "/failure.html");
}

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();


});

// apiKey=e284827945aba5c33479f5f213280a72-us8
//listid=1023c724cc
app.post("/failure", (req, res) => {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
