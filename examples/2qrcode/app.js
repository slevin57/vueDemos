import 'babel-polyfill'
import Vue from 'vue'
/**
 * 引入的必须是相对路径；
 * 必须带.vue后缀。
 */
import index from './index.vue'
//引入及注册使用组件
import vueQrious from './components/vue-qrious.vue'
Vue.component('vueQrious',vueQrious);

new Vue({
    el: '#app',
    render: h => h(index)
})