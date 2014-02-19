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
    
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html"; '+
    'charset=UTF-8"  />'+
    '</head>'+
    '</body>'+
    '1. <a href="http://amasnode1.azurewebsites.net/code.zip">A link to a zip file with all of your code</a><br>'+
    '2. <a href="localhost:8888">A link to your node.js app with no parameters</a><br>'+
    '3. <a href="localhost:8888/Spoon">A link to your node.js app with at least one parameter</a><br>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    //response.end();

    var pathname = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true); //parse query string
    var query = url_parts.query;
    var artistName = pathname.substring(1, pathname.length); 
    //console.log(JSON.stringify(query));

    console.log("Request for " + pathname + " received.");
    console.log( JSON.stringify(query));
    console.log(artistName);

    if (pathname == "" || pathname == "/") {
        connection.query("SELECT * FROM musicData", function (error, rows, fields) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(rows));
            response.end();
            });

    } else {
            connection.query("SELECT * FROM musicData WHERE artist = '" + artistName + "'", function (error, rows, fields) {
            //console.log("Values: " + query[]);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(rows));
            response.end();
            });

        }
    
}).listen(8888);

console.log("Server running at http://127.0.0.1:8888/");