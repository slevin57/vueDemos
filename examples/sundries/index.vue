<template>
    <div id="main">
        <h1>示例</h1>
        <ul>
            <li>
                <h3>通过render函数实现input标签数据双向绑定</h3>
                <inputTwoWayBindByRender></inputTwoWayBindByRender>
            </li>
            <li>
                <h3>函数式组件</h3>
                <div style="width:500px;height: 300px;">
                    <smart-item :compData="compData"></smart-item>
                </div>
                <button @click="change('text')">切换为文本组件</button>
                <button @click="change('img')">切换为图片组件</button>
                <button @click="change('video')">切换为视频组件</button>
            </li>
        </ul>
    </div>
</template>

<script>
import smartItem from './components/smartitem.js';

export default {
    components:{ smartItem },
    data (){
        return {
            compData: {}
        }
    },
    methods:{
        change (type) {
            if (type=='text') {
                this.compData = {
                    type:'text',
                    content:'我是父组件传入的文本内容',
                }
            } else if (type == 'img') {
                this.compData = {
                    type:'img',
                    url:'http://www.laihua.com/2018-4-20/1524201915823.jpg'
                }
            } else if (type == 'video') {
                this.compData = {
                    type:'video',
                    url:'http://www.laihua.com/img/video/intro.mp4',
                }
            }
        }
    },
    mounted(){
        this.change('text');
    }
}
</script>

<style>

</style>
