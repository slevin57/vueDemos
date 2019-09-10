<template>
<div class="app-comp" >
    <section class="wrapper" ref="wrapper" v-infinite-scroll="loadDataOpt1">
        <ul class="content" v-infinite-scroll="loadDataOpt2">
            <li v-for="(item,index) in lists" >
                <div class="pic" v-load-img="item.imgLink">
                    <img :src="item.imgLink" alt="Bing每日图片超高清" />
                </div>
                <p>第{{index}}行：{{item.title}}</p>
            </li>
        </ul>
    </section>    
    <p class="wrapper-hint"> 滚动wrapper触发。wrapper加载提示：执行加载数据的方法{{wrapperLoadNum}}</p>
    <p class="window-hint">滚动窗口触发。window加载提示：执行加载数据的方法{{windowLoadNum}}</p>
</div>
</template>

<script>
import dt from '../../utils/dt'
    export default {
        name: 'directives-loadimg',
        data () {
            return {
                wrapperLoadNum: 0,//加载数
                windowLoadNum: 0,
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
                // 处理window滚动事件的配置
                loadDataOpt1:{ 
                    loadFn: this.watchWindow, 
                },
                // 处理wrapper滚动事件的配置
                loadDataOpt2:{ 
                    loadFn: this.watchWrapper, 
                    ref: 'wrapper'
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
            /**
             * 滚动加载
             * 用于列表项的包裹元素上，接收一个对象作为参数
             * @loadFn {function} 必选。为数据加载的方法，当**指令绑定的元素底边出现在视窗内**便会触发此方法
             * @ref {string} 可选。指定监听滚动事件的目标对象，需将其`ref`值传入。默认为空，则会监听window的滚动事件
             */
            infiniteScroll: {
                inserted(el, binding, vnode) {
                    let ref = binding.value.ref;
                    let wrapperEl = ref ? vnode.context.$refs[ref] : "";
                    let listenEl = wrapperEl ? wrapperEl : window;
                    let params = {
                        wrapperEl, el, binding
                    };
                    // 对监听事件统一做防抖处理
                    listenEl.addEventListener("scroll", dt.debounce(binding.def.scrollHandler.bind(null, params), 100));
                },
                unbind(el, binding, vnode) {
                    let ref = binding.value.ref;
                    let wrapperEl = ref ? vnode.context.$refs[ref] : "";
                    let listenEl = wrapperEl ? wrapperEl : window;
                    listenEl.removeEventListener("scroll", binding.def.scrollHandler);
                },
                /**
                 * 因为removeEventListener需要两个参数，第二个参数要指定移除的函数名称，
                 * 所以监听滚动的方法不能定义在bind钩子中，
                 * 因此选择在指令对象loadData上定义监听滚动的方法，
                 * 此方法在钩子函数中可以通过binding.def 访问到，然后通过bind()方法把用到的钩子函数的参数传入 。
                 */
                scrollHandler(params, evt) {
                    // 可以通过事件对象evt去获取自身高度、滚动高度及子元素的高度；也可以通过钩子函数中的el参数获取
                    // console.log(`evt.target:`,evt.target.scrollTop);
                    let { wrapperEl, el, binding } = params;
                    let rect = el.getBoundingClientRect();
                    let targetBottom = wrapperEl ? wrapperEl.getBoundingClientRect().bottom : innerHeight;
                    if (rect.bottom <= targetBottom) {
                        binding.value.loadFn();
                    }
                },
            },
        },
        methods: {
            watchWindow() {
                console.log(`33:`,33);
                this.windowLoadNum++;
            },
            watchWrapper() {
                console.log(`2:`,2);
                this.wrapperLoadNum++;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-comp {
    height: 2000px;
}
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
.wrapper-hint{
    text-align: center;
}
.window-hint {
    width: 100%;
    position: fixed;
    bottom: 50px;
    text-align: center;
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
