
<script>
    export default {
        name: 'render',
        data () {
            return {
                value:'',
            }
        },
        render (h){
            let self = this;
            return h('div',[
                h('input',{
                    // dom属性，注意要与html特性attr区分开
                    domProps:{
                        value:this.value
                    },
                    on:{
                        input: function(event){
                            self.value = event.target.value;
                        }
                    }
                }),
                h('p','value:'+this.value),
            ])
        }
    }
</script>

<style>

</style>
