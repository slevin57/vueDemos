const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {

    devtool: 'inline-source-map',

    /* 
    *** fs.reddirSync(path):返回一个包含“指定目录下所有文件名称”的数组对象。
    *** __dirname: 全局变量，存储的是当前文件所在的文件目录，即绝对路径(__filename是文件名)。
    *** path.join():拼接路径，并返回该路径，结合__dirname可以达到path.resolve()方法同样的效果，例如
    * path.join('a','b')返回”a\b“;path.join(__dirname,'a','main.js')返回”D:\c\main.js“。
    *** fs.statSync():返回一个stat对象，包含文件或目录的大小、创建时间等信息,stat对象有很多属性及方法，
    * stat.isFile()和stat.ifDirectory()判断是文件还是目录。
    *** fs.existsSync(path):测试给定的路径是否存在.
    *** entry的纯前端例子实现：
        const arr = ['entry1.js','entry2.js','entry3.js'];
        arr.reduce((entryObj,filename)=>{
            const entry = `/Users/name/Desktop/examples/${filename}`;
            entryObj[filename] = ['webpack-hot-middleware/client',entry];
            return entryObj;
        },{})
    */
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        // 返回当前目录下每个文件夹及文件的绝对路径
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.js')
        // 判断fullDir是否是一个目录而且其下面也有app.js文件
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            // webpack-hot-middleware/clicen是热重载插件的配置要求,要给每一个入口都加上
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }

        // console.log('最终返回的entries对象', entries);
        return entries
    }, {}),

    output: {
        // 编译生成的js文件的存放目录，如果不存在则新建
        path: path.join(__dirname, '__build__'),
        // html中引用js文件用到的路径
        publicPath: '/__build__/',
        // 打包后生成的js文件名称
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },

    resolve: {
        alias: {
            vuex: path.resolve(__dirname, '../src/index.esm.js'),
            'assets': path.resolve(__dirname, './assets'), //相对路径解析为绝对路径并赋予别名assets
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        // 抽离公共代码插件的配置
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            filename: 'shared.js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

}
