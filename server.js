var http = require('http'); //require http module, and store all of it in variable http.
var url = require('url');

function start(route, handle){ //start function, so that we can start our server with one single function, i.e from index.js.
	function onRequest(request, response){ //onRequest funciton, i.e when the browser makes a request.
		var pathname = url.parse(request.url).pathname; //extract pathname from the requested url.
		console.log("Request for "+pathname+" received.");

		route(handle, pathname, response); //handle recieved from index.js file., passing response object so that the request handlers themselves can hendle the response. Otherwise results in blocking code.

		//var content = route(handle, pathname, response);
		//response.write(content); // write output on the page.
		//response.end();
	}

	http.createServer(onRequest).listen(2121);// start the server and listen to port passed.
	console.log("Server has started."); //write on console output.
}

exports.start = start; //export a function so that we can use it in some other file.