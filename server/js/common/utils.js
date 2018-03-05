var utils = {
	dcsj: function(code, mes, res, responseData,result) {
		responseData.code = code;
		responseData.message = mes;
		if(result){
			responseData.result = result;
		}
		
		res.json(responseData)
	}
}

module.exports = utils