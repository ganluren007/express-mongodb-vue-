var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
     title:{type:String},
     time:{
     	type: Date,
        default: Date.now
     },
     comments:{
     	type: Array,
        default: []
     },
     users:{
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },
    //阅读量
    views: {
        type: Number,
        default: 0
    },

    //简介
    description: {
        type: String,
        default: ''
    },
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Cate'
    },
    content:{
    	type:String
    }
    
});