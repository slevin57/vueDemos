import 'babel-polyfill'
import Vue from 'vue';
import Counter from './counter.vue'
import store from './store'

new Vue({
    el: '#app',
    store,
    render: h => h(Counter)
})