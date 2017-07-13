require('dotenv').config();
const express = require('express'),
  bodyParser = require('body-parser'),
  DarkSky = require('dark-sky'),
  forecast = new DarkSky(process.env.API_KEY);

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', 3000);

app.get('/getWeather/:latlong', (req, res, next) => {
  const latlong = req.params.latlong.split(',');
  if(latlong.length === 2) {
    forecast
      .latitude(latlong[0])
      .longitude(latlong[1])
      .exclude('minutely,hourly,daily,alerts,flags')
      .get()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
});

const http = require('http').Server(app);
http.listen(app.get('port'), function() {
  console.log(`Express Server Listening on port ${app.get('port')}.`);
});
