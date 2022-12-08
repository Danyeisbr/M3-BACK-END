var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

http.createServer(function(req, res){
    if(req.url.includes('images')){
    res.writeHead(200, { 'Content-Type':'image/jpeg' });
	var img = fs.readFileSync(__dirname +`${req.url}`);
	res.end(img);
} else {
    res.writeHead(404); //Ponemos el status del response a 404: Not Found
	res.end(); //No devolvemos nada más que el estado.
}

}).listen(1337, '127.0.0.1');
