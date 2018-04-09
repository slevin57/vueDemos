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
        // this.execQrious();
    },
    methods:{
        change(){
            this.config.value = `${Math.random()}`;
            this.config = {
                value: `${Math.random()}`,
                size: 200,
                padding: 10,
                // background: 'red',
                backgroundAlpha: .1,
                // foreground: 'yellow',
                foregroundAlpha: .5,
                level: 'H',
            }
        },
        // execQrious(){
        //     let qrious = 
        //     new Qrious({
        //         // 用于生成二维码的DOM元素。必须是<canvas>元素或<img>元素
        //         element: document.getElementById('qrious'),
        //         value: 'http://www.laihua.com/',
        //         size: 100,
        //         background: 'white',
        //         foreground: 'black',
        //         /**@二维码误差校正级别有4个：LMQH，
        //          * 即编码变脏或破损，也可自动恢复数据，
        //          * 级别越高，纠错能力越高，数据量也会增加，同样尺寸看起来也会更密。
        //          */
        //         level: 'H',
        //         // 二维码输出为图片时的MIME类型。
        //         mime: 'image/png',
        //     })
        //     // 通过toDataURL([mime])方法可以生成二维码的Base64编码数据的URI。如果你没有指定MIME Type，会使用默认值作为mime类型。
        //     this.qriousToDataURL = qrious.toDataURL();
        // }
    }
}
</script>

<style>

</style>
