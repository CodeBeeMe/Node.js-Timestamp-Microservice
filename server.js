// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//=============== My code below ===================

app.get('/api/timestamp/:date?', (req, res) => {

  let dateQuery = req.query.date;
  
  if(dateQuery === undefined) {
    req.utcTime = new Date().toUTCString();
    req.unixTime = new Date().getTime();
  } else {
    if(!isNaN(dateQuery)) {
      req.unixTime = Number(dateQuery);
      req.utcTime = new Date(Number(dateQuery)).toUTCString();
    } else {
      req.unixTime = Date.parse(dateQuery);
      req.utcTime = new Date(dateQuery).toUTCString();
    }
  }
  
  let timeStamp = { unix: req.unixTime, utc: req.utcTime };  
  res.json(timeStamp);  
});

