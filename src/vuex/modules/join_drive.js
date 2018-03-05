/* 
 * @Author: anchen
 * @Date:   2017-01-09 15:40:53
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-06-29 15:30:40
 */

//引入定义的mutation类型字符串
import * as types from '../mutation-types';
//引入请求数据模块
import clientHttp from '../../vueRescource/clientHttp.js';
import * as variables from "../../assets/js/common/variables.js";

// initial state
const state = {
	

	//  战绩榜数据
	zjb_infor: {},
	
}

// getters
const getters = {
	
	zjb_infor: state => state.zjb_infor,
	
}
// actions
const actions = {
	
	get_id({commit},data){
		commit(types.GETID, data);	
	}
	
}

// mutations
const mutations = {
	
	[types.TOJOIN](state, result) {
		

	},
	
}

export default {
	state,
	getters,
	actions,
	mutations
}