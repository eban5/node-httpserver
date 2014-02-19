//Esteban Amas, eea4ue, cs4720 HW4

// Include http and mysql module 
var http = require('http'),
    url = require('url'),
    mysql = require('mysql');
// var port = process.env.PORT || 1337;

var connection = mysql.createConnection({
    host: "stardock.cs.virginia.edu",
    user: "cs4720eea4ue",
    password: "spring2014",
    database: "cs4720eea4ue"
});

connection.connect();
console.log("Connection to DB made.");

http.createServer(function (request, response) {
    
    var pathname = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true); //parse query string
    var query = url_parts.query;
    console.log(JSON.stringify(query));

    console.log("Request for " + pathname + " received.");
    //console.log("Values: " + query);

if (pathname == "/this") {
    connection.query("SELECT * FROM musicData WHERE artist = 'Pink Floyd'", function (error, rows, fields) {
        console.log("Values: " + query);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(rows));
        response.end();
        });

} else {
    connection.query("SELECT * FROM musicData", function (error, rows, fields) {
        console.log("Else"); //Values: " + query);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(rows));
        response.end();
        });
    }
    
}).listen(8888);

console.log("Server running at http://127.0.0.1:8888/");