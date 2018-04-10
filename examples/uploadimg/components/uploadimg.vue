<template>
    <div id="uploadImg">
        <div id="wrapper" class="aaaa">
            <i class="icon"></i>
            <span class="tip">点击上传</span>
            <input name="files[]" type="file" id="inputer" @change="onReadfiles($event)">
            <img :src="previewLink" alt="">
            <label class="clickBtn" for="inputer">
                <i class="icon"></i>
                <span class="tip">点击上传</span>
            </label>
        </div>
        <!-- 读取进度：<progress id="progress" :value="progressVal" :max="fileSize"></progress> -->
        <button v-if="!uploadStatus">unupload</button>
        <button disabled v-else >uploading...</button>
    </div>
</template>

<script>
/**@图片上传组件
 **说明：
 * 图片上传至指定的服务器地址，并返回线上地址（可用于本地预览);
 * 图片开始读取、读取过程中、上传完成且完成等流程均支持自定义事件回调；
 **用法：
 * serverUrl:服务器地址，必传，String； 
 * maxSize: 图片大小最大值，Number；
 * onloaded: 图片上传完成后的事件回调，Function；其他上传阶段回调同理；
 */

/**todo
 * 1. 点击上传及拖拽上传
 * 2. 本地显示预览
 * 3. 显示上传进度（progress)
 * 4. es6 Class方法
 * 5. 大小限制
 * =========对外的暴露
 * 1. 图片上传服务器地址
 * 2. 读取进程的几个方法
 * 3. 大小限制
 */
 
import axios from 'axios'

export default {
    name: 'uploadImg',
    data () {
        return {
            file: '', // 上传的文件对象
            previewLink: '', //本地预览
            progressVal: '', // 上传进度值
            uploadStatus: false,  // 上传状态
        }
    },
    props:{
        // 图片上传的服务器地址
        serverUrl:{
            type: String,
            required: true,
        },
        //上传图片大小最大值,单位：M
        maxSize:{
            type: Number,
        }
    },
    methods:{
        onReadfiles (e) {
            this.file = e.target.files[0]
            console.log('this.file:',this.file);
            if (!this.file.name) return;
            if (this.maxSize && this.file.size > this.maxSize*1024*1024) return;

            if (window.FileReader) {
                let reader = new FileReader();

                // 文件读取为dataurl格式，结果放在reader.result中
                // 一旦开始读取，实例的result属性都会被填充，失败的话则为null
                reader.readAsDataURL(this.file);
                // 文件读取开始时触发
                reader.onloadstart = (e)=>{
                    this.$emit('onloadstart',e)
                };

                // 读取中
                reader.onprogress = (e)=>{
                    this.$emit('onprogress',e);
                };

                // 读取完成且成功
                reader.onload = (e)=> {
                    // base64格式的预览图
                    this.previewLink = reader.result;
                    
                    this.uploadStatus = true;
                    this.uploadClick().then(res => {
                        console.log('res:',res);
                        this.uploadStatus = false;
                        this.$emit('onloaded',res)
                    }).catch(err => {
                        console.log('上传失败:',err);
                        this.uploadStatus = false;
                    })
                }
                
                // 读取完无论是否成功触发
                reader.onloadend = (e)=>{
                    this.$emit('onloadend',e)
                };

                // 出错时触发
                reader.onabort = (e)=>{
                    this.$emit('onabort',e)
                };

            } else {
                console.log('浏览器不支持fileReader');
            }
        },
        uploadClick () {
            let p = new Promise( (resolve,reject) => {
                if(!this.file.name){resolve(true); return;}

                let fd = new FormData();
                fd.append('files[]',this.file)
                axios({
                    url: this.serverUrl,
                    method: 'post',
                    data: fd,
                    headers: { 'Content-Type': 'multipart/form-data; boundary=---12321' }
                }).then(res => {
                    // console.log('上传到服务器中的地址:',res.data.filename);
                    this.previewLink = res.data.filename || res.data.url;
                    resolve(true)
                }).catch(err => {
                    reject(false)
                })
            })
            return p;
        },
    }
}
</script>

<style lang="scss" scoped>
.aaaa {
    width: 197px;
    height: 120px;
    border: 1px solid #999;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover{
        label.clickBtn{
            display: flex;
        }
    }
    i.icon {
        display: block;
        width: 50px;
        height: 50px;
        background: url("/assets/mariketing_sprite.png");
        background-position:  -10px -351px;
    }
    span.tip {
        font-size: 14px;
        color: #999999;
        margin-top: 10px;
    }

    input[type="file"] {
        display: none;
    }

    img {
        display:inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left:0;
    }

    label.clickBtn {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left:0;
        margin: 0;
    }
}
#uploadImg {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
