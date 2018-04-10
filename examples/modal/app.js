import 'babel-polyfill'
import Vue from 'vue'
/**
 * 组建的引入必须是相对路径；
 * 必须带.vue后缀。
 */
import index from './index.vue'

import modal from './components/index.vue'
Vue.component('modal', modal)

new Vue({
    el: '#app',
    render: h => h(index)
})