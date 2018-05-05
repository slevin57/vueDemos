<template>
  <div>
        <lh-upload
        ref="lhUpload"
        :custom-class="['custom-upload1','custom-upload2']"
        :action="API.uploadCover"
        :accept="accept"
        :limit="1"
        @onReadStart="readStartHandler"
        @onOversize="oversizeHandler"
        @onReadProgress="readProgressHandler"
        @onRead="readSucHandler"
        @onUploadProgress="uploadProgressHandler"
        @onLoadFinished="uploadSuccessHandler"
        @onLoadFailed="uploadFailedHandler">
            <span class="inputer">拖拽或点击上传</span>
            <p slot="tip" class="custom-tip">这里是提示文字</p>
        </lh-upload>

        <button @click="abortHttp">取消请求</button>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // accept: 'image/*',
            accept: 'image/*',
            API:{
                uploadVideo:'/proxyapi/api2/video/uploadVideoFile',//上传整个视频
                uploadCover:'/proxyapi/api2/pic/uploadBitmapImg',//上传视频封面
                uploadChunk:'/proxyapi/api2/video/uploadVideo', //分片上传第一步api
                mergeChunk:'/proxyapi/api2/video/mergeVideo',  //分片上传第二部api
            },
        }
    },
    mounted(){
    },
    methods:{
        readStartHandler(e){
            console.log('开始读取:',e);
        },
        oversizeHandler(payload){
            console.log('超出限制大小:');
        },
        readProgressHandler (payload) {
            // console.log('读取本地文件ing：',payload);
        },
        readSucHandler(payload){
            console.log('读取成功：',payload);
        },
        uploadProgressHandler(payload){
            console.log('上传文件ing：',payload);
        },
        uploadSuccessHandler(payload){
            console.log('上传成功：:',payload);
        },
        uploadFailedHandler(payload){
            console.log('上传失败：',payload);
        },
        abortHttp(){
            this.$refs.lhUpload.cancelHttp();
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-upload1{
    display: table;
    margin: 0 auto;
}
.custom-upload2{
    margin-top: 20px;
}
.inputer{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 260px;
    height: 146px;
    border: 1px solid #000;
    border-style: dashed;
    margin:0;
}
.custom-tip{
    margin: 5px;
    font-size: 12px;
    color: gray;
}
</style>
