//内置
var path = require('path')
//第三方
var bodyParser = require('body-parser')
var express = require('express');
var mongoose = require("mongoose")
var utils=require("./js/common/utils.js")
var User = require('./models/User.js')
var config = require("./config.js")
//自己写的
//var router = require('----')

//启动express
var app = express()

var router = express.Router()
app.use( '/uploads', express.static( __dirname + '/uploads') );
// 配置 body-parser 插件
// 该插件会自动将表单 POST 请求体解析出来
// 然后作为一个对象挂载给 req.body 属性
app.use(bodyParser.urlencoded({
	extended: false,
	uploadDir: './uploads'
}))
app.use(bodyParser.json())

//设置跨域可访问的白名单
app.all('*', function(req, res, next) {
//	if(config.bmd.indexOf(req.headers.origin) >= 0) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By", ' 3.2.1')
		if(req.method == "OPTIONS") {
			res.send(200); //让options请求快速返回
		} else {
			next()
		};
//	}
});



mongoose.Promise = global.Promise;

//验证token中间件    全局中间件
app.use(function(req, res, next) {
	var username = req.body.username;
	var _id = req.body.token;

	if(config.notoken_url.indexOf(req.path) >= 0) {

		next();
	} else {
		User.findOne({
			"username": username,
			"_id": _id
		}, function(err, doc) {
			if(doc) {
				//          	给req挂在isLogin参数
				req.isLogin = true;
				req.userIfo = doc;
				next();
			} else {

				req.isLogin = false;
				res.json({
					code: "02",
					message: 'token验证失败'
				})
			}
		})
	}
})

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

// 挂载路由
app.use("/api", require("./routers/api.js"))
app.use("/admin", require("./routers/admin.js"))

//设置cookie
/*app.use( function(req, res, next) {
    req.cookies = new Cookies(req, res);

    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch(e){
            next();
        }

    } else {
        next();
    }
} );*/

//app.use(function (req,res,next) {

//	next();
//})

//监听http请求
mongoose.connect('mongodb://localhost:27017/blog', function(err) {
	if(err) {

	} else {
		console.log('数据库连接成功');
		app.listen(3000, function() {
			console.log("dfdff")
		});
	}
});