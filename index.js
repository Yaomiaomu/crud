//导入模块
var express = require('express');
var bodyParser = require("body-Parser");
var router = require("./router.js");

//创建服务
var app = express();

//配置模板引擎
app.engine('html', require('express-art-template'));

//配置body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//挂载路由
app.use('/public/', express.static("public"));
app.use('/node_modules/', express.static("node_modules"));
app.use(router);
app.use((req, res) => { res.render("404.html") });
//配置端口
app.listen(3000, () => {
  console.log('The application runs at 127.0.0.1:3000');
})