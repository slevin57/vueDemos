<template>
<div id="main">
    <modal> slot目前是失效的</modal>
    <button @click="modalClick()">toggled</button>
</div>
</template>

<script>
import Modal from './components/index.js'
export default {
    data () {
        return {
            isShow: false,
        }
    },
    methods: {
        modalClick () {
            Modal.born()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bbb {
    height:2000px;
}
.aaa {
    width: 200px;
    height: 2000px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
