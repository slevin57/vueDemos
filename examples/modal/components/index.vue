<template>
<div>
        <transition name="fade">
        <section v-if="visible" class="cropper-modal">
            <div class="close" @click="isModalVisble(false)">closed</div>
            <div class="content">
                contnet
                <slot>地方地方</slot>
            </div>
        </section>
        </transition>
</div>
</template>

<script>

export default {
    props: {
        isShow:{
            type: Boolean
        }
    },
    data () {
        return {
            visible: false,
        }
    },
    computed: {
    },
    mounted () {
        console.log('mounted:');
        this.scrollbarHandler();
    },
    updated () {
        console.log('updated:');
        this.scrollbarHandler();
    },
    beforeDestroy () {
        console.log('beforeDestroyed');
    },
    methods: {
        isModalVisble (type) {
            this.visible = type;
        },
        scrollbarHandler () {
            // body滚动条宽度
            let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            if (scrollbarWidth) {
                document.documentElement.style.cssText = `overflow-y: hidden; padding:0 ${scrollbarWidth}px 0 0;`
            } else {
                document.documentElement.style.cssText = `overflow-y:auto;padding:0;`
            }
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cropper-modal{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(1,1,1,.5);
    z-index: 9999;
    overflow-y: scroll;
    padding-right: 15px;
    .close {
        position: absolute;
        right: 50px;
        top: 50px;
    }
    .content {
        display: table;//宽高根据子元素自适应
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
