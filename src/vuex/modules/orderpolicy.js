/* 
 * @Author: anchen
 * @Date:   2017-01-09 15:40:53
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-06-30 17:13:05
 */

import * as types from '../mutation-types';
import clientHttp from'../../vueRescource/clientHttp.js';

// initial state
const state = {
    orderinfomation : {},
    orderBuyInsuranceCode : "901",
    orderList : []
}

// getters
const getters = {
    orderinfomation : state => state.orderinfomation,
    orderBuyInsuranceCode : state => state.orderBuyInsuranceCode,
    orderList : state => state.orderList,
}
// actions
const actions = {
    //获取车牌号码和手机号
    getCarnoAndPhone({ commit },data){
        let options = {
            url: "QUERCARDNOANDPHONE",
            data: data,
            success: (rep) => {
                if(rep.result.resultCode=="00"){
                    commit(types.GET_CARDNOANDPHONE, {carno:rep.carno,phone:rep.phone});
                }
            }
        }
        clientHttp(options);
    },
    //预约购买保险
    orderBuyInsurance({ commit },data){
        let options = {
            url: "ORDERBUYINSURANCE",
            data: data,
            success: (rep) => {
                var msg,resultcode=rep.result.resultCode;
                if(resultcode=="00"){
                    commit(types.ORDER_INSURE_CODE, {resultcode:rep.result.resultCode});
                }else{
                    switch (resultcode) {
                      case '02':
                          msg = "该车辆已预约购保"
                          break;
                      case '03':
                          msg = "超过预约次数"
                          break;
                      case '01':
                          msg = "网络忙，请稍后再试"
                          break;
                      default:  
                    }
                    $.toast(msg);
                }
            }
        }
        clientHttp(options);
    },
    orderBuyInsuranceCode({ commit },data){
        commit(types.ORDER_INSURE_CODE, {resultcode:"901"});
    },
    queryOrderList({ commit },data){
        let options = {
            url: "QUERYORDERLIST",
            data: data,
            success: (rep) => {
                if(rep.result.resultCode === "00"){
//              debugger;
                    var result = rep.orderInfoList;
                    commit(types.GET_ORDERLIST, result);
                }
            }
        }
        clientHttp(options);
    }
}

// mutations
const mutations = {
    [types.GET_CARDNOANDPHONE](state,  result) {
//      debugger;
        state.orderinfomation = result;
    },
    [types.GET_ORDERLIST](state,  result) {
        state.orderList = result;
    },
    [types.ORDER_INSURE_CODE](state,  result) {
        state.orderBuyInsuranceCode = result.resultcode;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
