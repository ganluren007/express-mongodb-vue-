var  fs=  require('fs');
var utils = {
	dcsj: function(code, mes, res, responseData,result) {
		responseData.code = code;
		responseData.message = mes;
		if(result){
			responseData.result = result;
		}
		
		res.json(responseData)
	},
	readImage:function(path,res){
        fs.readFile(path,'binary',function(err,  file)  {
            if  (err)  {
                console.log(err);
                return;
            }else{
                console.log("输出文件");
                
                res.write(file,'binary');
                res.end();
            }
        });
    }
}

 
module.exports = utils