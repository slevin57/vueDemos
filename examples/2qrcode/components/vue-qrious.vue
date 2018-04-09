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
            // default: function(){
            //     return {
            //         value:'dfdsfafasvalue',
            //         size: 100,
            //     }
            // }
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
        'config.mime':function (){
            this.qrious.mime = this.config.mime;
        },
    },
    mounted () {
        
        const element = this.$refs.qrcode;
        // const config = this.config;
        this.qrious = new Qrious({
            element,
            ...this.config,
            // value:'44334'
        });
        
    }
}
</script>