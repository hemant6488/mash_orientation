//router file, which routes the different url requested to the requestHandlers.

function route(handle, pathname, response, postData, execQuery) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') { //if there exists a request handler then pass to it.
		return handle[pathname](response, postData, execQuery); // passing the response object further to out requestHandlers. passing the postData received by a POST request, here sent from server.js.
	}
	else{
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type":"text/plain"}); //sending the 404 error code.
		response.write("404 - Page Not Found.");
		response.end();
		//return "404 Not found.";
	}
}
exports.route = route;