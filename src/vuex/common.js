/* 
 * @Author: anchen
 * @Date:   2017-01-09 15:40:53
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-06-27 18:02:46
 */
import * as types from './mutation-types';

// initial state
export const state = {
   //展示遮罩层
    showOverlay : false,
    afterRouterLoade : ""
}

// getters
const getters = {
    showOverlay: state => state.showOverlay,
    afterRouterLoade : state => state.afterRouterLoade
}

//actions
const actions = {
    modalOverlay({ commit },data) {
        commit(types.SHOWMODALOVERLAY, data);
    },
    afterRouterLoade({ commit },data) {
        commit(types.AFTERLROUTELOADING, data);
    }
}

// mutations
const mutations = {
    [types.SHOWMODALOVERLAY](state,  data) {
        var flag = data.state=="1"?true:false;
        state.showOverlay = flag;
    },
    [types.AFTERLROUTELOADING](state,  data) {
//      debugger;
        state.afterRouterLoade = data.tag;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
