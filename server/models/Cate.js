/**
 * Created by 毅 on 2016/8/28.
 */

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/cate');

module.exports = mongoose.model('Cate', categoriesSchema);