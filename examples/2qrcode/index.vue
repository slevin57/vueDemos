<template>
  <div id="main">
      <button @click="change('value')">change value</button>
      <button @click="change('size')">change size</button>
      <button @click="change('background')">change background</button>
      <button @click="change('backgroundAlpha')">change backgroundAlpha</button>
      <button @click="change('foreground')">change foreground</button>
      <button @click="change('foregroundAlpha')">change foregroundAlpha</button>
      <button @click="change('level')">change level</button>
      <vue-qrious :config="config"></vue-qrious>
  </div>
</template>

<script>
import Qrious from 'qrious'


export default {
    data(){
        return {
            config:{
                value:'',
                size:100,
                padding: 0,
                background:'white',
                backgroundAlpha: 1,
                foreground:'black',
                foregroundAlpha: 1,
                level:'L',
                mime:'image/png',
            }
        }
    },
    mounted(){
        
    },
    methods:{
        change(type){
            // this.config = {
            //     value: `${Math.random()}`,
            //     size: 150,
            //     // background: 'red',
            //     backgroundAlpha: .5,
            //     // foreground: 'yellow',
            //     foregroundAlpha: .5,
            //     level: 'H',
            // }
            switch (type) {
                case 'value':
                    this.config.value = `${Math.random()}`;
                    break;
                case 'size':
                    this.config.size = 100+Math.random()*100;
                    break;
                case 'background':
                    let color = Math.floor(100000+Math.random()*900000);//生成随机6位数
                    this.config.background = `#${color}`;
                    break;
                case 'backgroundAlpha':
                    this.config.backgroundAlpha = Math.random().toFixed(1);
                    break;
                case 'foreground':
                    this.config.foreground = `#${Math.floor(100000+Math.random()*900000)}`;
                    break;
                case 'foregroundAlpha':
                    this.config.foregroundAlpha = Math.random().toFixed(1);
                    break;
                case 'level':
                    this.config.level = ['L','M','Q','H'][Math.floor(Math.random()*4)];
                    break;
                default:
                    break;
            }
        },
    }
}
</script>

<style>

</style>
