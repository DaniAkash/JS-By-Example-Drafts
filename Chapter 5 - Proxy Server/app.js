const express = require('express'),
  bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', 3000);

app.post('/getWeather', (req, res, next) => {

});

const http = require('http').Server(app);
http.listen(app.get('port'), function() {
  console.log(`Express Server Listening on port ${app.get('port')}.`);
});
