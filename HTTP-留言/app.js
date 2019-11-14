var fs = require('fs');
var http = require('http');
var template = require('art-template');
var url = require('url');

var dataList = [
	{
		name: '小白',
		msg: '我們希望讀書、讀人、讀世界的方法,幫助人們可以遇見更好的自己。',
		time: (new Date()).toLocaleString()
	},
	{
		name: '小明',
		msg: '我們希望讀書、讀人、讀世界的方法,幫助人們可以遇見更好的自己。',
		time: (new Date()).toLocaleString()
	},
];

http
	.createServer(function (request, response) {
		var objUrl = url.parse(request.url,true);
		var pathname = objUrl.pathname;
		// console.log(objUrl)
		//首页
		if (pathname === '/') {
			fs.readFile('./views/index.html', function (err, data) {
				if (err) {
					return response.end('404 NOT FOUND');
				}
				var rel = template.render(data.toString(), dataList);
				response.end(rel);
			});
		} else if (pathname === '/post') {
			// 点击留言  进行页面跳转
			fs.readFile('./views/post.html', function (err, data) {
				if (err) {
					return response.end('404 NOT FOUND');
				}
				response.end(data);
			});
		} else if (pathname === '/pinglun') {
			//提交留言  重定向回首页
			var obj = {};
			obj.name = objUrl.query.name;
			obj.msg = objUrl.query.msg;
			obj.time = (new Date()).toLocaleString();
			dataList.unshift(obj);
			response.statusCode = 302;
			response.setHeader('Location','/');
			response.end();
			// response.statusCode = 302;
			// response.setHeader('Location', '/');
			// response.end();

		} else if (pathname.indexOf('/public/') === 0) {
			//加载静态资源
			fs.readFile('.' + pathname, function (err, data) {
				if (err) {
					return response.end('404 NOT FOUND');
				}
				response.end(data);
			});
		}
	})
	.listen(8000, function () {
		console.log('启动服务器');
	});


