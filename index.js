var express = require('express');
var Bing = require('node-bing-api')({ accKey: "a43582571a4946d0a3e7afb34d09807d" });
var urlToImage = require('url-to-image');
var fs = require('fs');
var Q = require('q');
var webshot = require('webshot');
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;
var app = express();

app.get('/:query', function (req, res, next) {	
  	return Q.ninvoke(Bing, 'web', req.params['query'], {
		top: 5,  // Number of results (max 50) 
		skip: 0   // Skip first 3 results 
  	}).then(function(result) {
  		var body = JSON.parse(result[0]['body']);
  		var arr = body.webPages.value.map(function(obj) {
  			//return {url: obj['displayUrl'], title: obj['name'], base64: 0};
			return Q.ninvoke(webshot, obj['displayUrl'], 'google.png')
  			.then(function(err) {
				var base64str = base64_encode('google.png');
				return {url: obj['displayUrl'], title: obj['name'], base64: base64str};
			}).catch(function(err) {				
				console.error(err);
				return {url: obj['displayUrl'], title: obj['name'], base64: 0};
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