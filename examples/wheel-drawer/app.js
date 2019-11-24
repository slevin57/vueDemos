import 'babel-polyfill'
import Vue from 'vue'
/**
 * 引入的必须是相对路径；
 * 必须带.vue后缀。
 */
import index from './index.vue'
//引入及注册使用组件
import wheelDrawer from './components/wheel-drawer.vue'
Vue.component('wheelDrawer',wheelDrawer);

new Vue({
    el: '#app',
    render: h => h(index)
})