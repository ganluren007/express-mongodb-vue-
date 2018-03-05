//第三方
var express = require('express')

//自己写的
var User = require('../models/User.js')
var Cate = require('../models/Cate.js')
var Content = require('../models/Content.js')
var utils = require("../js/common/utils.js")

// 1. 通过 express.Router() 得到一个 router 实例
var router = express.Router()

//统一返回格式
var responseData;

router.use(function(req, res, next) {
	responseData = {
		code: 0,
		message: ''
	}

	next();
});

// 2. 把所有的请求处理路由都挂载给 router

//注册接口
router
	//这里为什么不需要引入req和res形式参数？？？？？？？？
	.post('/user/register', function(req, res, next) {

		var username = req.body.username;
		var password = req.body.password;

		User.findOne({
			"username": username
		}, function(err, doc) {
			if(doc) {
				utils.dcsj("01", "该用户已注册", res, responseData)
			} else {
				new User({
					"username": username,
					"password": password
				}).save(function(err, doc) {
					utils.dcsj("00", "注册成功", res, responseData)
				})
			}
		})
	})

router.post("/user/login", function(req, res, next) {

	var username = req.body.username;
	var password = req.body.password;
	User.findOne({
		"username": username
	}, function(err, doc) {
		if(doc) {
			User.findOne({
				"username": username,
				"password": password
			}, function(err, doc) {

				if(doc) {

					//					
					utils.dcsj("00", "登陆成功，正在跳转", res, responseData, {
						isAdmin: doc.isAdmin,
						token: doc._id,
						username: doc.username
					})
					next();
				} else {
					utils.dcsj("01", "密码不正确", res, responseData)
					next();
				}
			})
		} else {
			utils.dcsj("02", "该用户不存在", res, responseData)
			next();
		}
	})
})

router.post("/user/yz_token", function(req, res, next) {
	var username = req.body.username;
	var _id = req.body.token;

	User.findOne({
		"username": username,
		"_id": _id
	}, function(err, doc) {
		if(doc) {

			utils.dcsj("00", "验证成功", res, responseData, doc)
		} else {
			utils.dcsj("02", "该用户不存在", res, responseData)
		}
	})
})

router.post("/index", function(req, res, next) {

	Cate.find().sort({
		_id: -1
	}).then(function(doc) {

		if(doc) {
			var cateIfo = doc;
			console.log(doc[0]._id)
			Content.find({
				category: doc[0]._id
			}).populate([{
				path: 'users',
				select: 'username _id'
			}, {
				path: 'category',
				select: 'name _id'
			}]).then(function(doc) {

				utils.dcsj("00", "查询成功", res, responseData, {
					"content": doc,
					"cateIfo": cateIfo
				})
			})

		} else {
			utils.dcsj("02", "查询失败dfdfdf", res, responseData)
		}
	})
})

//点击查询分类的内容
router.post("/findCateContent", function(req, res, next) {
    var cateid=req.body._id;
	
			Content.find({
				category: cateid
			}).populate([{
				path: 'users',
				select: 'username _id'
			}, {
				path: 'category',
				select: 'name _id'
			}]).then(function(doc) {

				utils.dcsj("00", "查询成功", res, responseData, {
					"content": doc
					
				})
			})

		
})

// 3. 把 router 暴露出去
module.exports = router

// 4. 在 app.js 中，通过 app.use(router)