var express = require('express');
var server = express();

server.listen(process.env.PORT, function() {
    console.log('Node server is listening on port ' + process.env.PORT);
});


server.get('/', function(req,res){
    res.send('Usage: https://salty-retreat-88810.herokuapp.com/[unix timestamp]  or  https://salty-retreat-88810.herokuapp.com/[month day, year]');
});

server.get('/:input', function(request, response) {
    var inp = isNaN(parseInt(request.params.input)) ? request.params.input : parseInt(request.params.input) * 1000;

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

    response.send(o);
});

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
