/* 
 * @Author: anchen
 * @Date:   2017-01-09 15:40:53
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-06-29 15:30:40
 */

import * as types from '../mutation-types';
import clientHttp from'../../vueRescource/clientHttp.js';

// initial state
const state = {
	 orderinfomations : {},
    calculateResult: {},
    driverFirstInfo : {},
    joinGoodeDriver : true
}

// getters
const getters = {
	
    calculateResult : state => state.calculateResult,
    driverFirstInfo : state => state.driverFirstInfo,
    joinGoodeDriver : state => state.joinGoodeDriver
}
// actions
const actions = {
	

    //测算保费
    calculateFee({ commit },data){
//      debugger;
        let options = {
            url: "CALCULATE_POLICY_FEE",
            type: "jsonp",
            data: data,
            success: (rep) => {
//              debugger;
                if(rep.resultCode =="0") {
                    commit(types.CALCULATEPOLICYFEE, rep.simpleQuoteResult );
                }
            }
        }
        clientHttp(options);
    },
    //增加经验
    taskForExperience({ commit },data){
//      debugger;
        let options = {
            url: "TASKFOREXPERIENCE",
            data: data,
            success: (result) => {
                console.info(data);
            }
        }
        clientHttp(options);
    },
    //查询用户是否加入好司机
    queryDriverFirstInfo({ commit },data){
//      debugger;
        let options = {
            url: "QUERYDRIVEFIRSTINFO",
            data: data,
            success: (rep) => {
                commit(types.QUERY_DRIVEFIRSTINFO, rep.isJoin );
            }
        }
        clientHttp(options);
    }/*,
    activeGooderDiver({ commit },data){
        window.location.href = common_Url+"/join_driver_index.html?appsId=" + data.appsId;
    }*/
}

// mutations
const mutations = {

    [types.CALCULATEPOLICYFEE](state,  result) {
//      debugger;
        state.calculateResult = result;
    },
    [types.QUERY_DRIVEFIRSTINFO](state,  code) {
//      debugger;
       if(code==="Y"){
       	   state.joinGoodeDriver=true;
       }else{
       	    state.joinGoodeDriver=false;
       }
       
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
