//requestHandler file, handles various requests based on the url and returns content.

var queryString = require("querystring");
var exec = require("child_process").exec;
var fs =  require("fs");

function start(response, request, execQuery) {
	console.log("Request handler 'start' was called.");

	/*1. sleep function. // for testing blocking code.

	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	sleep(10000);

	*/
	
	/*2. exec("watch date", function(error, stdout, stderr){
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write(stdout);
		response.end();
		//console.log("stdout : "+stdout);
	});
	*/

	/*var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/displayResults" method="post">'+
	'<textarea name="text" rows="2" cols="80"></textarea><br />'+
	'<input type="submit" value="Execute Query" />'+
	'</form>'+
	'</body>'+
	'</html>';
	*/


	//read the html file to be parsed in the browser. readfile('file.html', callbackFunction());
	fs.readFile('./index.html', function (err, html){
		if (err){throw err;}
		//write fs
		// console.log(fs);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	}); 

	
}


function displayResults(response, request, execQuery) {
	console.log("Request handler 'displayResults' was called.");

	//----------------------------------------------------------
		var postData = "";
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received PostData Chunk : "+ postDataChunk +".");
		});

		//end data listener.
		request.addListener("end", function(){
			console.log("Final postData: "+postData);
			//if postData is empty.
			if(postData === ""){postData += "show databases;"};
			execQuery(postData, response);
		});


	//-----------------------------------------------------------
	

	//console.log("reuslts: " + json);
	//response.write(json); //undefined
	//response.end();
}


exports.start = start;
exports.displayResults = displayResults;