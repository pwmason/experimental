var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received");

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
		});

		request.addListener("end", function() {
			route(handle, pathname, request, response, postData);
		})
	}
	http.createServer(onRequest).listen(1337);
	console.log('Server listening on 1337');
}

exports.start = start;