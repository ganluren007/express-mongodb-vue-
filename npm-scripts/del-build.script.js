var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var buildDir = path.resolve(__dirname, '../dist');
rimraf(buildDir, fs, function cb() {
  console.log('dist目录已清空');
});
