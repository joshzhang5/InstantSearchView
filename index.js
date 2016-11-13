var express = require('express');
var Bing = require('node-bing-api')({ accKey: "a43582571a4946d0a3e7afb34d09807d" });
var urlToImage = require('url-to-image');
var fs = require('fs');
var app = express();

app.get('/', function (req, res, next) {
	
  	Bing.web("Tiger", {
		top: 30,  // Number of results (max 50) 
		skip: 0   // Skip first 3 results 
  	}, function(error, temp, body) {
		var arr = body.webPages.value.map(function(obj) {
			urlToImage(obj['displayUrl'], 'google.png').then(function() {
				var base64str = base64_encode('google.png');
				return {url: obj['displayUrl'], title: obj['name'], base64: base64str};
			}).catch(function(err) {
				console.error(err);
			});			
		});
		res.send(arr); 
  	});
});

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})	