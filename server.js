var http = require('http');
var url = require('url');

var server = http.createServer(handleRequest);

server.listen(process.env.PORT);

function handleRequest(req,res) {
    
    var route = url.parse(req.url).pathname;
    
    switch(route) {
        
        case '/':
            res.write('home route');
            res.end();
            break;
        
        case '/test':
            res.write('test route');
            res.end();
            break;
        
        default:
            res.write('no such route');
            res.end();
            break;
    }
}