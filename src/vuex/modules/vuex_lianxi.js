

//引入定义的mutation类型字符串
import * as types from '../mutation-types';
// initial state
const state = {
	 word:""
}

// getters
const getters = {
	
    word : state => state.word,
    
}
// actions
const actions = {
	

    //测算保费
    changword({ commit },data){

        commit(types.CHANGEWORD, data);	
    }
}

// mutations
const mutations = {

    [types.CHANGEWORD](state,  result) {
//      debugger;
        state.word = result;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}