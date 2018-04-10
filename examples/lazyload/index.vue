<template>
<div id="main">
    <lazyload :imgList = "imgList"></lazyload>
</div>
</template>

<script>

export default {
    data () {
        return {
            imgList:[
                // {src: require()},
                // {src: require('../../src/assets/mac2.jpg')},
                // {src: require('../../src/assets/mac3.jpg')},
                // {src: require('../../src/assets/mac4.jpg')},
                // {src: require('../../src/assets/mac5.jpg')},
                // {src: require('../../src/assets/mac6.jpg')},
                // {src: require('../../src/assets/mac7.jpg')},
                // {src: require('../../src/assets/mac8.jpg')},
                // {src: require('../../src/assets/mac9.jpg')},
                {src: '/assets/mac1.jpg'},
                {src: '/assets/mac2.jpg'},
                {src: '/assets/mac3.jpg'},
                {src: '/assets/mac4.jpg'},
                {src: '/assets/mac5.jpg'},
                {src: '/assets/mac6.jpg'},
                {src: '/assets/mac7.jpg'},
                {src: '/assets/mac8.jpg'},
                {src: '/assets/mac9.jpg'},
            ]
        }
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
