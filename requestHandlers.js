//requestHandler file, handles various requests based on the url and returns content.

var queryString = require("querystring");
var exec = require("child_process").exec;

function start(response, postData, execQuery) {
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

	var body = '<html>'+
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
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}


function displayResults(response, postData, execQuery) {
	console.log("Request handler 'displayResults' was called.");
	execQuery(queryString.parse(postData).text, response); //pass the response object so that this function in itself can print out the response.
	//console.log("reuslts: " + json);
	//response.write(json); //undefined
	//response.end();
}


exports.start = start;
exports.displayResults = displayResults;