import 'babel-polyfill'
import Vue from 'vue'
/**
 * 引入的必须是相对路径；
 * 必须带.vue后缀。
 */
import index from './index.vue'

new Vue({
    el: '#app',
    render: h => h(index)
})