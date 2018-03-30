const express = require('express')
const webpack = require('webpack')
const WebpackConfig = require('./webpack.config')
// 通过webpack-dev-middleware输出的文件存在于内存中，配合webpack形成文件映射系统
const webpackDevMiddleware = require('webpack-dev-middleware')
// 结合webpack-dev-middleware使用，实现浏览器无刷更新，也就是HMR
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const compiler = webpack(WebpackConfig)

// 插件webpack-dev-middleware应用于配置
app.use(webpackDevMiddleware(compiler, {
    // 这里的publickpath要与WebpackConfig.output.publicPath一样！
    publicPath: WebpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}))

// 应用webpack-hot-middleware插件，增加浏览器无刷更新（热刷新）
app.use(webpackHotMiddleware(compiler))

/**
 * 缺少这句的话，服务跑起来访问不到index.html，显示cant GET.
 **** express.static(pathStr): 将传入路径目录下的所有内容作为静态资源托管，例如传入‘public',
 * 那么就可以访问localhot:3000/public/...下面的资源。
 **** app.use():为path设置访问时需要经过的中间件，默认是'/'，也就是所有访问都要用到的中间件。
 */
app.use(express.static(__dirname))

const port = process.env.PORT || 8888
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
