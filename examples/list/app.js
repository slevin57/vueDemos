import 'babel-polyfill'
import Vue from 'vue'
/**
 * 组建的引入必须是相对路径；
 * 必须带.vue后缀。
 */
import index from './index.vue'

import child from './components/index.vue'
Vue.component('child', child)

new Vue({
    el: '#app',
    render: h => h(index)
})