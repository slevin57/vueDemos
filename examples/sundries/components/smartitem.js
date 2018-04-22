// 文本组件
let TextItem = {
    props:['compData'],
    render (h) {
        return h('div',[
            h('p','文本组件'),
            h('p',this.compData.content),
        ])
    }
}

// 图片组件
let ImgItem = {
    props: ['compData'],
    render (h) {
        return h ('div',{
            attrs:{
                width: '100%',
                height: '100%',
            }
        },[
            h('p','图片组件'),
            h('img',{
                attrs: {
                    src: this.compData.url,
                    width:'80%',
                    height: '80%',
                },
            })
        ])
    }
}

// 视频组件
let VideoItem = {
    props: ['compData'],
    render (h) {
        return h('div',{
            attrs: {
                width: '100%',
                height: '100%',
            }
        },[
            h('p','视频组件'),
            h('video',{
                attrs: {
                    src:this.compData.url,
                    controls: 'controls',
                    autoplay: 'autoplay',
                    width: '80%',
                    height: '80%',
                }
            })
        ])
    }
}

export default {
    functional: true,
    props: {
        compData: {
            type: Object,
            required: true
        }
    },
    render (h,context){
        // 根据父组件传入内容选择子组件的类型
        function getComponent (){
            let data = context.props.compData;
            switch (data.type) {
                case 'img':
                    return ImgItem;
                    break;
                case 'video':
                    return VideoItem;
                    break;
                case 'text':
                    return TextItem;
                    break;
            }
            return TextItem;
        }

        return h(
            getComponent(),
            {
                props:{
                    compData: context.props.compData,
                }
            },
            context.children
        )
    }
}