var http = require('http'); //require http module, and store all of it in variable http.
var url = require('url');

function start(route, handle, execQuery){ //start function, so that we can start our server with one single function, i.e from index.js.
	function onRequest(request, response){ //onRequest funciton, i.e when the browser makes a request.
		var pathname = url.parse(request.url).pathname; //extract pathname from the requested url.
		console.log("Request for "+pathname+" received.");

		//2. route(handle, pathname, response); //handle recieved from index.js file., passing response object so that the request handlers themselves can hendle the response. Otherwise results in blocking code.

		//1. var content = route(handle, pathname, response);
		//response.write(content); // write output on the page.
		//response.end();




		//---------------------collecting postData-------------------------
		//var postData = "";
		//request.setEncoding("utf8");

		/*
		Node.js serves our code, the POST data in small chunks, callbacks that are called upon
		certain events, to make the whole process non blocking. These events are data (an new chunk of POST
		data arrives) and end (all chunks have been received).

		We need to tell Node.js which functions to call back to when
		these events occur. This is done by adding listeners to the request
		object that is passed to our onRequest callback whenever an
		HTTP request is received.
		*/
		/*
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received PostData Chunk : "+ postDataChunk +".");
		});

		//end data listener.
		request.addListener("end", function(){
			console.log("Final postData: "+postData);
			route(handle, pathname, response, postData, execQuery);
		});
		*/
		route(handle, pathname, response, request, execQuery);
	}

	http.createServer(onRequest).listen(2121);// start the server and listen to port passed.
	console.log("Server has started."); //write on console output.
}

exports.start = start; //export a function so that we can use it in some other file.