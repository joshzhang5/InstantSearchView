var express = require('express')
var Bing = require('node-bing-api')({ accKey: "a43582571a4946d0a3e7afb34d09807d" });
var app = express()

app.get('/', function (req, res, next) {
  //res.send('Hello World!')
  Bing.web("Pizza", {
    top: 10,  // Number of results (max 50) 
    skip: 0   // Skip first 3 results 
  }, function(error, temp, body){
    console.log(body.webPages.value);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})	