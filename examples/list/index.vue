<template>
  <div>
    <section>
        <h2>father</h2>
        <!-- 初步： -->
        <!-- <child title="shapes" :items='shapes'>
            <div class="list-item" v-for="shape in shapes">
                <div>{{shape.name}}<small> ({{shape.sides}} sides)</small></div>
            </div>  
        </child>
        <child title="colors" :items='colors'>
            <div class="swatch" v-for="color in colors">
                <div class="swatch" :style="{ background: color.hex }"></div>
                {{color.name}}
            </div>  
        </child> -->

        <!-- 进一步优化：
            在父组件中进行遍历并生成dom结构的操作实际是重复的；
            所以这个操作统一集合到字组件中，父组件只负责把数据通过props传递给字组件；
            然后字组件通过作用域插槽把遍历后的数据返回给父组件，由父组件使用子组件的时候，
            通过<template>元素接收并且在<template>元素中进行个性化渲染
         -->
        <div>
            <h3>case1. 形状列表</h3>
            <child :title="'shapes'" :items="shapes">
                <template slot="slotName" slot-scope="shape">
                    <div>{{shape.name}} <small> ({{shape.sides}} sides) </small></div>
                </template>
            </child>
        </div>
        <div>
            <h3>case2. 颜色列表</h3>
            <child :title="'colors'" :items="colors">
                <template slot="slotName" slot-scope="color">
                    <span class="swatch" :style="{background: color.hex}"></span>
                    {{color.name}}
                </template>
            </child>
        </div>
        <div>
            <h3>case3. 使用组件时没未传入插槽内容，则显示字组件中默认的内容（如果有的话）</h3>
            <child :title="'default'" :items="colors">
                
            </child>
        </div>
    </section>
  </div>
</template>

<script>

export default {
    data () {
        return {
            shapes: [ { name: 'Square', sides: 4 }, { name: 'Hexagon', sides: 6 }, { name: 'Triangle', sides: 3 } ], 
            colors: [ { name: 'Yellow', hex: '#f4d03f' }, { name: 'Green', hex: '#229954' }, { name: 'Purple', hex: '#9b59b6' } ]
        }
    },
}
</script>

<style lang="scss">
.swatch {
    display: inline-block;
    width: 10px;
    height: 10px;
}
</style>
