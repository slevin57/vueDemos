import 'babel-polyfill'
import Vue from 'vue'
/**
 * 组件的引入必须是相对路径；
 * 必须带.vue后缀。
 */
import index from './index.vue'

import uploadimg from './components/uploadimg.vue'
Vue.component('uploadimg',uploadimg)

new Vue({
    el: '#app',
    render: h => h(index)
})