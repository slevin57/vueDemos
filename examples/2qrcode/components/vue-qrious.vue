<template>
    <div>
        <canvas ref="qrcode"></canvas>
    </div>
</template>

<script>
import Qrious from 'qrious'
export default {
    data() {
        return {qrious: null};
    },
    props: {
        config:{
            type:Object,
            required: true,
            default: function(){
                return {
                    value:'default value',
                    size: 100,
                    padding: 0,
                    background:'white',
                    backgroundAlpha: 1,
                    foreground:'black',
                    foregroundAlpha: 1,
                    /**@二维码误差校正级别有4个：LMQH，
                    * 即编码变脏或破损，也可自动恢复数据，
                    * 级别越高，纠错能力越高，数据量也会增加，同样尺寸看起来也会更密。
                    */
                    level:'L',
                    mime:'image/png',
                }
            }
        }
    },
    watch: {
        'config.value':function (){
            this.qrious.value = this.config.value;
        },
        'config.size':function (){
            this.qrious.size = this.config.size;
        },
        'config.padding':function (){
            this.qrious.padding = this.config.padding;
        },
        'config.background':function (){
            this.qrious.background = this.config.background;
        },
        'config.backgroundAlpha':function (){
            this.qrious.backgroundAlpha = this.config.backgroundAlpha;
        },
        'config.foreground':function (){
            this.qrious.foreground = this.config.foreground;
        },
        'config.foregroundAlpha':function (){
            this.qrious.foregroundAlpha = this.config.foregroundAlpha;
        },
        'config.level':function (){
            this.qrious.level = this.config.level;
        },
        // 二维码输出为图片时的MIME类型。
        'config.mime':function (){
            this.qrious.mime = this.config.mime;
        },
    },
    mounted () {
        
        const element = this.$refs.qrcode;
        this.qrious = new Qrious({
            // 用于生成二维码的DOM元素。必须是<canvas>元素或<img>元素
            element,
            ...this.config,
        });
        
    }
}
</script>