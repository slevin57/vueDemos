<template>
<div>
    <section class="wrapper" v-load-data="loadDataOpt">
        <ul class="content" >
            <li v-for="(item,index) in lists">
                <div class="pic" v-load-img="item.imgLink">
                    <!-- <img src="../assets/pic1.jpeg" alt="本地图片" srcset=""> -->
                    <img :src="item.imgLink" alt="Bing每日图片超高清" />
                </div>
                <p>第{{index}}行：{{item.title}}</p>
            </li>
        </ul>
    </section>    
    <p>加载提示：{{loadHint}}</p>
</div>
</template>

<script>
    export default {
        name: 'directives-loadimg',
        data () {
            return {
                loadHint:'',//加载提示
                loadNum:'',//加载次数
                API: 'https://api.douban.com/v2/movie/coming_soon',//豆瓣开发者平台
                lists: [
                    // {title:'去年元月时',imgLink:require('../../assets/pic1.jpeg')},//本地图片
                    // {title:'去年元月时',imgLink:'../../assets/pic1.jpeg'},//本地图片
                    {title:'去年元月时',imgLink:'/assets/pic1.jpeg'},//因为webpack中设置了别名assets，所以这样写也可以
                    {title:'花市灯如昼',imgLink:'http://api.dujin.org/bing/1366.php'},
                    {title:'月上柳梢头',imgLink:'http://api.dujin.org/bing/1920.php'},
                    {title:'人约黄昏后',imgLink:'http://api.dujin.org/bing/1920.php'},
                    {title:'今年元月时',imgLink:'http://api.dujin.org/bing/1920.php'},
                    {title:'月与灯依旧',imgLink:'http://api.dujin.org/bing/1920.php'},
                    {title:'不见去年人',imgLink:'http://api.dujin.org/bing/1920.php'},
                    {title:'泪湿春衣袖',imgLink:'http://api.dujin.org/bing/1920.php'},
                ],
                loadDataOpt:{ //加载数据的配置
                    loadDataFn: this.loadDataFn, //加载的方法
                }
            }
        },
        directives: {
            /** @图片加载之前
             * 图片加载出来之前，先用随机颜色占位，
             * 等图片完全加载之后，再显示图片
            */
            loadImg:{
                inserted(el,binding){
                    let color = Math.floor(100000+Math.random()*900000);//生成随机6位数
                    el.style.backgroundColor = `#${color}`

                    //先把图片隐藏掉
                    el.childNodes[0].style.display = 'none';
                    let img = new Image();
                    img.src = binding.value;
                    // 等图片加载完成在显示出来，避免出现图片加载过渡显示的那个阶段
                    console.log('图片是否加载完:',img.complete);
                    img.onload = ()=>{
                        el.childNodes[0].style.display = 'block';
                    }
                }
            },
            /**@滚动加载数据
            * 用在出现滚动条的元素上；
            * 使用时传入一个配置对象，其中包含一个loadDataFn的加载数据的方法
            * v-load-data="loadDataOpt.loadDataFn"
            */
            loadData: {
                bind (el,binding) {
                    el.addEventListener('scroll',binding.def.watchScroll.bind(null,binding));
                },
                unbind (el,binding) {
                    el.removeEventListener('scroll',binding.def.watchScroll);
                },
                /**
                因为removeEventListener需要两个参数，第二个参数要指定移除的函数名称，
                所以监听滚动的方法不能定义在bind钩子中，
                因此选择在指令对象loadData上定义监听滚动的方法，
                此方法在钩子函数中可以通过binding.def 访问到，然后通过bind()方法把用到的钩子函数的参数传入 。
                */
                watchScroll (binding,evt) {
                    // 通过事件对象evt去获取自身高度、滚动高度及子元素的高度；也可以通过钩子函数中的el参数获取
                    let scrollTop = evt.target.scrollTop,
                        wrapperHeight = evt.target.clientHeight,
                        contentHeight = evt.target.childNodes[0].clientHeight;
                    
                    if(scrollTop + wrapperHeight >= contentHeight) {
                        // 执行传入的加载数据的方法
                        binding.value.loadDataFn();
                    }
                }
            },
            /** 错误示例
            // 监听滚动执行的方法不能写在钩子函数内
            // 否则解除监听的时候获取不到
            loadData: {
                bind: function (el,binding,vnode) {
                        el.addEventListener('scroll',(evt)=>{
                            // 通过el去获取自身高度、滚动高度及子元素的高度
                            let scrollTop = el.scrollTop,
                                wrapperHeight = el.clientHeight,
                                contentHeight = el.childNodes[0].clientHeight;
                            
                            if(scrollTop + wrapperHeight >= contentHeight) {
                                // 执行传入的加载数据的方法
                                binding.value.loadDataFn();
                            }

                            // 通过事件对象获取自身数据及子元素数据也是可以的
                            // console.log('evt.target.height:',evt.target.clientHeight);
                            // console.log('evt.target.scrollTop:',evt.target.scrollTop);
                            // console.log('99:',evt.target.childNodes[0].clientHeight);
                            // // console.log('99:',evt.target.children[0].clientHeight);
                        })
                },
                unbind: function (el) {
                    el.removeEventListener('scroll');
                }
            } */
        },
        methods: {
            loadDataFn() {
                this.loadHint = `执行加载数据的方法${this.loadNum++}`
                // console.log('加载数据的方法:',this.$http.get);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
}
.wrapper{
    width: 450px;
    height: 600px;
    margin: 0 auto;
    overflow-y: scroll;
    border:1px solid #333333;
}
.content li{
    width: 220px;
    margin: 0 auto;
}
.pic {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
img{
    width: 100%;
    height: 100%;
}
</style>
