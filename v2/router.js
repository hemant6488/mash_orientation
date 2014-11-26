//router file, which routes the different url requested to the requestHandlers.

var path = require('path'),
    fs = require('fs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};



function route(handle, pathname, response, request, execQuery) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') { //if there exists a request handler then pass to it. //=== type conversion is done.	
		return handle[pathname](response, request, execQuery); // passing the response object further to out requestHandlers. passing the postData received by a POST request, here sent from server.js.
	}
 



//-----------------------------Basic file Router(for HTML and JS file source codes.)----------------------------
	else{
		var filename = path.join(process.cwd(), pathname);
    	path.exists(filename, function(exists) {
        if(!exists) {
            console.log("not exists: " + filename);
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        response.writeHead(200, {'Content-Type':mimeType});

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(response);

    }); //end path.exists






		/*1
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type":"text/plain"}); //sending the 404 error code.
		response.write("Error 404, Page Not Found.");
		response.end();
		//return "404 Not found.";
		*/
	}
}
exports.route = route;