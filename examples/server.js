const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express();

/**
 * 缺少这句的话，服务跑起来访问不到index.html，显示cant GET.
 **** express.static(pathStr): 将传入路径目录下的所有内容作为静态资源托管，例如传入‘public',
 * 那么就可以访问localhot:3000/public/...下面的资源。
 **** app.use():为path设置访问时需要经过的中间件，默认是'/'，也就是所有访问都要用到的中间件。
 */
app.use(express.static(__dirname))

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
})