const express = require('express'),
  bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.set('port', 3000);

app.post('/registration', (req, res, next) => {
  let each;
  for(each in req.body) {
    if(!req.body[each]) {
      res.status(400).json({error: `Invalid ${each}`});
      return next();
    }
  }
  res.status(200).json({message: `${req.body.username} is Registered Successfully`});
});

const http = require('http').Server(app);
http.listen(app.get('port'), function() {
  console.log(`Express Server Listening on port ${app.get('port')}.`);
});
