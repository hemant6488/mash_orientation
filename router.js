//router file, which routes the different url requested to the requestHandlers.

function route(handle, pathname, response) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		return handle[pathname](response); // passing the response object further to out requestHandlers.
	}
	else{
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type":"text/plain"}); //sending the 404 error code.
		response.write("404 - Page Not Found.");
		response.end();
		return "404 Not found.";
	}
}
exports.route = route;