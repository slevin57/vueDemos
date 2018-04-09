<template>
  <div id="main">
      <button @click="change()">change</button>
      <vue-qrious :config="config"></vue-qrious>
  </div>
</template>

<script>
import Qrious from 'qrious'


export default {
    data(){
        return {
            qriousToDataURL:'',
            config:{
                value:'adfafadf',
            }
        }
    },
    mounted(){
        
    },
    methods:{
        change(){
            this.config = {
                value: `${Math.random()}`,
                size: 150,
                padding: 10,
                // background: 'red',
                backgroundAlpha: .5,
                // foreground: 'yellow',
                foregroundAlpha: .5,
                level: 'H',
            }
        },
    }
}
</script>

<style>

</style>
