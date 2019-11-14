var express = require('express');
var router = require('./router')
var bodyParser = require('body-parser')
//创建app 服务
var app = express();

//静态资源服务
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//配置 模板引擎
app.engine('html', require('express-art-template'));

//配置body-parser， 获取post请求数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//把路由容器挂载到 app 服务中
app.use(router)


app.listen(4000, function () {
    console.log('app server is running')
})