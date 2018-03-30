
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
    count:0
}

const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

const mutations = {
    increment: state => state.count++,
    decrement: state => state.count--,
    /**不能下面这样写，mutation中获取不到getter返回的状态 */
    // incrementIfEven: (state) => {
    //     console.log(getters.evenOrOdd);
    //     if (getters.evenOrOdd === 'even') {
    //         state.count++;
    //     }
    // },
}

const actions = {
    incrementIfEven: (context) => {
        if (context.getters.evenOrOdd === 'even') {
            context.commit('increment')
        }
    },
    decrementIfOdd: ({getters,commit}) => {
        if (getters.evenOrOdd == 'odd') {
            commit('decrement');
        }
    },
    incrementAsync({commit}){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                commit('increment');
                resolve();
            }, 1000);
        })
    },
    decrementAsync ({commit}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('decrement');
                resolve();
            }, 1000);
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})