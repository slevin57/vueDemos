<template>
  <div :class="customClass">
        <section class="wrapper">
            <div ref="inputBox" class="input" @click="deliverClick">
                <slot>
                    <div class="lh-o-inputer">点击或者拖拽</div>
                </slot>
                <input ref="input" type=file :accept="accept" name="files[]" style="display:none;" @change="handleClick($event)">
            </div>
            <slot name="preview" v-if="base64">
                <div class="lh-o-preview">
                    <img :src="base64" alt="">
                </div>
            </slot>
            <slot name="mask" v-if="base64">
                <div class="lh-o-mask">
                    <span class="option del" @click="delFile">删除</span>
                    <span class="option rep" @click="replaceFile">替换</span>
                </div>
            </slot>
        </section>
        <slot name="tip">
            <div class="tip">
                默认提示文字
            </div>
        </slot>
  </div>
</template>

<script>
    export default {
        name:'lhUpload',
		props:{
			action:{
				type: String,
				required: true,
			},
			accept:{
                type: String,
                required: true,
            },
            // 文件大小限制,单位是M
            limit: {
                type: Number
            },
            // http请求头配置，axios要求其格式为对象
            headers:{
                type: Object,
                default: ()=>{
                    return { 'Content-Type': 'multipart/form-data; boundary=---12321' };
                },
            },
            //可以在数组中传入多个自定义class，数组中也可嵌套对象或者三目运算。
            customClass:{
                type:Array,
                default:['lh-upload'],
            }
		},
		data(){
			return{
                targetFile:{},
                source: {},//用于取消上传
                chunkNumber: 0,// 分片上传视频总片数
                base64: '',  //本地预览
			}
        },
		mounted(){
            ['dragenter','dragover','dragleave','drop'].forEach(type => {
                this.$refs.inputBox.addEventListener(type,this.handleDrag,false);
            })
		},
        methods:{
            // 传递点击事件给input
            deliverClick(){
				this.$refs.input.click()
            },
            handleClick(e){
                // 文件列表【对象】，包含一个多个拖拽释放的文件对象
                // console.log('通过e与input都可以拿到files对象：',e.target.files==this.$refs.input.files);
                let files = e.target.files;
                if (!files.length) return;
                // 限制文件上传数量
                if (files.length > 1){
                    console.log('不支持多文件上传！:');
                    return;
                }

                [].forEach.call(e.target.files,(file)=>{
                    this.targetFile = file;
                    console.log('file:',file);
                    this.onFileSelected(file);
                })
            },
            // 处理拖拽上传
            handleDrag(e){
                // 阻止浏览器响应默认拖拽事件
                e.preventDefault();
                if (e.type == 'drop'){
                    console.log('e.dataTransfer:',e.dataTransfer);
                    let files = e.dataTransfer.files;
                    if (!files.length) return;
                    // 限制拖拽文件数量
                    if(files.length > 1){
                        console.log('不支持多个文件！:');
                        this.emit('onOverNum');
                        return;
                    }
                    
                    [].forEach.call(files,(file)=>{
                        this.targetFile = file;
                        // console.log('file:',file);
                        this.onFileSelected(file);
                    })
                }
            },
            // 本地读取文件及大小/类型限制处理
			onFileSelected(file){
                // 获取自定义的上传类型
                let type;
                if (this.accept.match(/(\S*)\//)){
                    type = this.accept.match(/(\S*)\//)[1];
                } else {
                    type = '*';
                }

                // 限制文件大小
                if (this.limit && this.targetFile.size/1024/1024 > this.limit) {
                    this.$emit('onOversize');
                    return;
                };

                // 用于取消上传
				let CancelToken = this.$http.CancelToken;
                this.source = CancelToken.source();
                
                // 开始本地读取文件
				let reader = new FileReader();
                reader.readAsDataURL(this.targetFile);
                reader.onloadstart= e => {
                    this.$emit('onReadStart',e);
                }
				reader.onprogress = (e)=>{
                    this.$emit('onReadProgress',e)
                };
                // 本地文件读取完成（无论读取成功还是失败）
                // 成功的话reader.result值为文件，否则为null
                reader.onloadend = (e)=>{
                    this.$emit('onReadEnd',e);
                };
				// 本地文件读取完成且成功
				reader.onload = (e)=>{
                    // 通过reader.result可以拿到base64格式文件进行本地预览
                    console.log('reader:',reader);
                    this.base64 = reader.result;
                    this.$emit('onRead',{reader,e})
                    
                    if (type =='image'){ //**上传图片到服务器
                        this.imageUpload(this.action)
                        .then(res=>{
                            this.$emit('onLoadFinished',res);
                            this.clearTargetFile();
                        })
                        .catch(err=>{
                            this.$emit('onLoadFailed',err)
                        })
                    } else { //**分片上传到服务器
                        this.chunkUpload();
                    }
                };
            },
            // 大文件（视频）分片上传到服务器
			chunkUpload(url){

                let filesize = this.targetFile.size;   //文件整体大小
                let perSize = 4*1024*1024;  //每片大小4M
                this.chunkNumber = Math.ceil(filesize / perSize);  // 总片数，向上取整
                let index = 0;  //当前上传
                let start = 0;  //分片开头
                let end = 0;   //分片结尾
                let filename = new Date().getTime() + '.mp4';
                let loaded = 0;  //整体文件上传完成的动态进度
                let _loaded = 0;  //根据已上传完的片数得出的进度
                // console.log('loaded:',loaded);
                let arr = [];
                for(let i = 0; i < this.chunkNumber; i++) {
                    arr.push(i);
                }

                const _this = this;
                arr.reduce(function(sequence, index) {
                    return sequence.then(function() {
                        start = end;
                        end = start + perSize;
                        if (end > filesize) {
                            end = filesize;
                        }
                        const chunk = _this.targetFile.slice(start, end);
                        const formData = new FormData();
                        formData.append("files[]", chunk);

                        
                        return _this.$http({
                            url: `/proxyapi/api2/video/uploadVideo?filename=${filename}&index=${index}`,
                            method: 'post',
                            data: formData,
                            headers: this.headers,
                            cancelToken: _this.source.token,
                            onUploadProgress: e => {
                                // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                                if (e.lengthComputable) {
                                    loaded = _loaded + e.loaded;
                                    _this.$emit('onUploadProgress',{loaded,total:filesize,e});
                                }
                            }
                        })
                    }).then(function(results) {
                        _loaded = (index+1)*2*1024*1024 ;
                        // console.log(loaded);
                        // console.log('完成第' + index + '片文件上传');
                        if (index + 1 === arr.length) {// 上传完成
                            let filename = results.data.data.filename;
                            let chunkNumber = _this.chunkNumber;
                            _this.$http.post(`/proxyapi/api2/video/mergeVideo?filename=${filename}&chunkNumber=${chunkNumber}`)
                            .then(res => {
                                _this.$emit('onLoadFinished',res)
                                _this.clearTargetFile();
                            })
                            .catch(err => {
                            this.$emit('onLoadFailed',err)
                            })
                        }
                    });
                }, Promise.resolve());

            },
            // 小文件直接上传到服务器
            imageUpload(url){

				let p = new Promise((resolve, reject) => {
					var formData = new FormData();
					formData.append("files[]", this.targetFile);
					this.$http({
						url: url,
						method: 'post',
						data: formData,
						headers: this.headers,
                        cancelToken: this.source.token,
                        onUploadProgress: e => {
                            // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                            if (e.lengthComputable) {
                                e.e = e; //与视频分片上传时返回的数据格式统一
                                this.$emit('onUploadProgress',e);
                            }
                        }
					})
					.then(res => {
						resolve(res);
					})
					.catch(err => {
						reject(err);
					})
				});
				return p;
            },
            // 取消上传
            cancelHttp(){
                // console.log('取消上传:',this.source);
                if (this.source.token){
                    this.clearTargetFile();
                    this.source.cancel('用户取消上传');
                }
            },
            // 解决第二次点击input不会触发onchange事件的bug
            clearTargetFile(){
                if(this.$refs.input){
                    this.$refs.input.value ="";
                }
            },
            delFile(){
                this.base64 = '';
                this.targetFile = {};
                this.clearTargetFile();
            },
            replaceFile(){
                this.$refs.input.click();
            },
        }
    }
</script>

<style lang="scss" scoped>
.lh-upload{
    // table-cell也可以自适应子元素大小，但margin:0 auto;会失效。
    display: table;
    margin: 0 auto;
}
.wrapper{
    position: relative;
    &:hover{
        .lh-o-mask{
            display: flex;
        }
    }

    .lh-o-inputer{
        cursor: pointer;
        width: 260px;
        height: 146px;
        display: block;
        border: 1px solid #000;
        border-style: dashed;
        margin:0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .lh-o-preview,.lh-o-mask{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .lh-o-preview{
        img{
            // 父元素无固定宽高，子元素（替换元素）自适应父元素
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .lh-o-mask{
        display: none;
        background: rgba(0,0,0,.7);
        justify-content: space-evenly;
        align-items: center;
        .option{
            border-radius: 4px;
            cursor: pointer;
            width: 66px;
            height: 30px;
            font-size: 14px;
            background-color: #25c6f8;
            color: #fff;
            text-align: center;
            line-height: 30px;
        }
    }
}

.tip{
    margin: 5px;
    font-size: 12px;
    color: gray;
}


</style>
