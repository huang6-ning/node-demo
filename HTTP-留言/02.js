var fs = require('fs');
var http = require('http');

http
    .createServer(function (request, response) {
        var url = request.url;
        if (url === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return response.end('404 NOT FOUND');
                }
                response.end(data);
            });
        } else if (url.indexOf('/public/') === 0) {
            console.log(url);  //  /public/img/image3.jpg
            fs.readFile('.' + url, function (err,data) {
                if (err) {
                    return response.end('404 NOT FOUND');
                }
                response.end(data);
            });
        }
    })
    .listen(3000, function () {
        console.log('启动服务器');
    });


