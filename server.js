var http = require('http');
var url = require('url');

var server = http.createServer(handleRequest);

server.listen(process.env.PORT);

function handleRequest(req, res) {

    var route = url.parse(req.url).pathname;


    var inp = isNaN(parseInt(route)) ? route : parseInt(route) * 1000;

    var date = new Date(inp);
    var o;

    if (isValidDate(date)) {
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        o = {
            "unix": parseInt(date.getTime() / 1000),
            "natural": month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        };
    }
    else {
        o = {
            "unix": null,
            "natural": null
        };
    }

    res.write(JSON.stringify(o));
    res.end();

    /*
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
    */
}

// from: http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
function isValidDate(d) {
    var rv = false;
    if (Object.prototype.toString.call(d) !== "[object Date]") {
        rv = false;
    }
    else {
        rv = !isNaN(d.getTime());
    }
    return rv;
}