<template>
    <div>
        <!-- <h2>child component</h2> -->
        <h3 class="title">{{title}}</h3>
        <ul class="list">
            <li v-for="item in items">
                <slot name="slotName" v-bind="item">
                    这里是备用内容（可选），当父组件中没有传入插槽的内容时会默认显示。
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['title','items']
    }
</script>
<style>
ul,li{
    list-style: none;
}
</style>

