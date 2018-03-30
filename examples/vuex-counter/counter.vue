<template>
  <div id="app">
        Number is {{$store.state.count}},</br>
        <button @click="increment()">increment +</button> <button @click="decrement()">decrement -</button> </br>
        <button @click="incrementIfEven()">increment +</button> if Number is even</br>
        <button @click="decrementIfOdd()">decrement -</button> if Numver is odd</br>
        <button @click="incrementAsync()">increment +</button> async.</br>
        <button @click="decrementAsyncByDispatch()">derecment -</button> async.</br>
  </div>
</template>

<script>
import { mapMutations,mapActions } from 'vuex'

export default {
    data () {
        return {

        }
    },
    computed:{
        
    },
    methods:{
        ...mapMutations([
            'increment',
            'decrement',
        ]),
        ...mapActions([
            'decrementIfOdd',
            'incrementIfEven',
            'incrementAsync',
        ]),
        decrementAsyncByDispatch(){
            this.$store.dispatch('decrementAsync')
        }
    }
}
</script>

<style>

</style>
