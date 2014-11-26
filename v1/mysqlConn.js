//get required module
var mysql = require("mysql");
var json = "";

function execQuery(queryStr, response){ // response object for writing stuff, because returning string was not possible.

	//create connection with given credentials.
	var connection = mysql.createConnection({ 
		host : "localhost",
		user : "hemant",
		password: "mashglobal",
		database: "db1"
	});
	
	queryStr += ";"; //concat ; at the end of the query.
	connection.query(queryStr, function(error, results){
		if(error) throw error;
		//console.log(results);
		json = JSON.stringify(results); //??
		console.log("JSON-RESULT: "+json);
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write("Results: "+json);
		response.end();
	});
	//return json;
	connection.end();
	
}

exports.execQuery = execQuery;
