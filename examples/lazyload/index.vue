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

                // {src: '/assets/mac1.jpg'},
                // {src: '/assets/mac2.jpg'},
                // {src: '/assets/mac3.jpg'},
                // {src: '/assets/mac4.jpg'},
                // {src: '/assets/mac5.jpg'},
                // {src: '/assets/mac6.jpg'},
                // {src: '/assets/mac7.jpg'},
                // {src: '/assets/mac8.jpg'},
                // {src: '/assets/mac9.jpg'},

                {src: 'https://resources.laihua.com/2018-11-10/c505afb0-641d-4489-b08d-55633c9cab8d.png'},
                {src: 'https://resources.laihua.com/2018-11-13/2614aaa8-2e56-46fa-b03b-28920f6c1ff3.png'},
                {src: 'https://resources.laihua.com/2018-11-10/06d82807-a768-4ae3-b4cf-9d45b39878ee.png'},
                {src: 'https://resources.laihua.com/2018-11-2/987612b0-de8d-11e8-a0b5-8ff9ceef3374.png'},
                {src: 'https://resources.laihua.com/2018-11-2/97d9fac0-de82-11e8-96e3-af2b6f185003.png'},
                {src: 'https://resources.laihua.com/2018-10-31/fac4e0da-8988-41fe-810b-84110936914f.png'},
                {src: 'https://resources.laihua.com/2018-10-31/5dedfb80-dcbc-11e8-a1b9-67cb886d5d62.png'},
                {src: 'https://resources.laihua.com/2018-10-31/5eedd8f0-dcb4-11e8-a1b9-67cb886d5d62.png'},
                {src: 'https://resources.laihua.com/2018-11-5/914d7c14-7364-44a8-8bf0-2836034f0020.png'},
            ]
        }
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
