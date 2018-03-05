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

//在admin开头的路径使用admin验证
router.use(function(req, res, next) {

	if(req.userIfo.isAdmin) {
		next();
	} else {
		utils.dcsj("01", "您不是管理员，不能进入管理系统", res, responseData);
		return;
	}
})

//查询用户接口
router.post('/getuserifo', function(req, res, next) {
	var option = {
		req: req,
		model: User,
		callback: function(users, count) {
			utils.dcsj("00", "查询成功", res, responseData, {
				"user_ifo": users,
				totsize: count
			})
		},
		obj: {
			path: ''
		}
	}
	fycx(option)
})

//查询分类接口
router.post("/getCateifo", function(req, res, next) {
	var option = {
		req: req,
		model: Cate,
		callback: function(users, count) {
			utils.dcsj("00", "查询成功", res, responseData, {
				"cate_ifo": users,
				totsize: count
			})
		},
		obj: {
			path: ''
		}
	}
	fycx(option)
})

//新增分类接口
router.post("/addCate", function(req, res, next) {

	var name = req.body.name;

	Cate.findOne({
		"name": name
	}).then(function(doc) {

		if(doc) {

			utils.dcsj("01", "已存在相同的分类名", res, responseData);

		} else {

			return new Cate({
				"name": name
			}).save()
		}
	}).then(function() {

		utils.dcsj("00", "保存成功", res, responseData)
	})
})

//修改分类接口
router.post("/changeCate", function(req, res, next) {
	var name = req.body.name;
	var id = req.body.id;
	Cate.findOne({
		"name": name,
		"_id": {
			$ne: id
		}
	}).then(function(doc) {
		if(doc) {
			utils.dcsj("01", "已存在相同的分类名", res, responseData);
		} else {
			return Cate.update({
				_id: id
			}, {
				name: name
			})
		}
	}).then(function(doc) {
		
		utils.dcsj("00", "修改成功", res, responseData);
	})
})

//删除分类接口

router.post("/deletCate", function(req, res, next) {
	var id = req.body.id;
	Cate.findOne({
		_id: id
	}, function(err, doc) {
		if(err) {
			utils.dcsj("01", "不存在该类目", res, responseData);
		} else {
			Cate.remove({
				_id: id
			}, function(err, doc) {
				Content.remove({
					category: id
				}).then(function(doc){
					utils.dcsj("00", "删除成功", res, responseData);
					
				})
				
			})
		}
	})
})

//内容的增删改查
//查询内容
router.post("/getContentifo", function(req, res, next) {
	var option = {
		req: req,
		model: Content,
		callback: function(users, count) {
			Cate.find().then(function(doc) {

				utils.dcsj("00", "查询成功", res, responseData, {
					"content_ifo": users,
					totsize: count,
					cate: doc
				})

			})

		},
		obj: [{path: 'users', select: 'username _id'}, {path: 'category', select: 'name _id'}]
	}
	fycx(option)
})

//新增内容
router.post("/addContent", function(req, res, next) {
	var data = req.body;
	data.users=req.body.token;
	new Content(data).save().then(function() {
		utils.dcsj("00", "添加成功", res, responseData);
	})
})

//修改内容
router.post("/changeContent", function(req, res, next) {
	var id=req.body.id
	var data = req.body;
	data.users=req.body.token;
	Content.update({
        _id: id
    }, data).then(function() {
        utils.dcsj("00", "修改成功", res, responseData);
    });
})



//写方法的参数的时候最好不要写多个,而是写成对象的形式，以免后期修改方法要添加参数的时候，出现参数位置问题，而要去需改所有方法
function fycx(option) {
	var page = Number(option.req.body.page);
	var size = Number(option.req.body.size);

	option.model.count().then(function(count) {
		option.model.find().sort({
			_id: -1
		}).limit(size).skip(size * (page - 1)).populate(option.obj).then(function(users) {
			if(option.callback) {
				option.callback(users, count)
			}
			/*utils.dcsj("00", "查询成功", res, responseData,{
				   "user_ifo":users,totsize:count
			});*/

		});
	})
}

module.exports = router