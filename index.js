var express = require('express');
var Bing = require('node-bing-api')({ accKey: "a43582571a4946d0a3e7afb34d09807d" });
var urlToImage = require('url-to-image');
var fs = require('fs');
var Q = require('q');
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;
var app = express();

app.get('/', function (req, res, next) {	
  	return Q.ninvoke(Bing, 'web', "Cows", {
		top: 1,  // Number of results (max 50) 
		skip: 0   // Skip first 3 results 
  	}).then(function(result) {
  		var body = JSON.parse(result[0]['body']);
  		var arr = body.webPages.value.map(function(obj) {
  			return Q.ninvoke(https, 'get', obj['url']).then(function(response) {
  				var url = response.responseUrl;
				return Q(urlToImage(url, 'google.png'));
  			}).then(function() {
				var base64str = base64_encode('google.png');
				return {url: obj['displayUrl'], title: obj['name'], base64: base64str};
			}).catch(function(err) {
				console.error(err);
			});
		});
		return Q.all(arr);
	}).then(function(arr) {
		res.send(arr);
	}).catch(function(err) {
		console.error(err);
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