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
  
  console.log(req.params.date);
      
  let dateString = req.params.date; // accessing the date parameter
  
  function currentDate() { //if dateQuery variable is empty or undefined return the current date
    req.millisecs = new Date().getTime();
    req.fullDate = new Date().toUTCString();
  }
  
  function unixToUtc() { //in case it's a unix string, convert the string into a number using Number() or parseInt()
    req.millisecs = Number(dateString);
    req.fullDate = new Date(Number(dateString)).toUTCString();
  }
  
  function utcToUnix() { //in case it's not a unix string, convert the string representation of a date to the number of milliseconds since January 1, 1970, 00:00:00 UTC
    req.millisecs = Date.parse(dateString); 
    req.fullDate = new Date(dateString).toUTCString();
  }
  
  //using the above corresponding functions, applying the correct date conversion based on the nature of dateString variable
  dateString === undefined ? currentDate() : (!isNaN(dateString) ? unixToUtc() : utcToUnix()); 
  
  res.json({ unix: req.millisecs, utc: req.fullDate }); // the timestamp object
  
  //console.log(isNaN(dateString));
  
});
