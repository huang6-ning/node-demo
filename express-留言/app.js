// 加载 express
var express = require('express');
var bodyParser = require('body-parser');
//创建服务器应用程序
var app = express();

//静态资源服务
app.use('/public/', express.static('./public/'));

//配置使用art-template 模板引擎
app.engine('html', require('express-art-template'));

// 配置 body-parser 中间件，用来获取 post 请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//路由
app.get('/', function (req, res) {
    //使用模板引擎
    res.render('index.html', dataList);
});
app.get('/post', function (req, res) {
    res.render('post.html');
});
app.post('/post', function (req, res) {
    //获取表单 post 请求的数据
    var comment = req.body;
    comment.time = (new Date()).toLocaleString();
    dataList.unshift(comment);
    res.redirect('/');
});
    

app.listen(3000, function () {
    console.log('app server is running');
});

//数据
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