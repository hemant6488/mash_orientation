var server = require("./server"); 
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var mysqlConn = require("./mysqlConn");

var handle = {}; //array declared, later on to be used as associative array.

handle["/"] = requestHandlers.start; // associative array, values mapped to other values.
handle["/start"] = requestHandlers.start; //requestHndlers.start is a function that should be called when /start url is requested. function located in file requestHandlers.js
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle, mysqlConn.execQuery); //start the server -> server.js function used here., //passing execQuery just in case we need connect to mysql.
