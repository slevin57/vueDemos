<template>
  <div id="app">
      d
      {{count}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            
        }
    },
    computed:{
        ...mapState(['count'])
    },
    mounted(){

    }
}
</script>

<style>

</style>
