var pkg = require('./package.json')
var path  = require('path');//nodejs的path模块
var webpack  = require('webpack');//webpack模块
var HtmlWebpackPlugin  = require('html-webpack-plugin');//
var OpenBrowserPlugin  = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/index.js'),
        //将第三方的依赖(node_module)单独打包
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
       path: __dirname+ '/build',
       filename: "[name].[hash:8].js" //这个是发布的MD5的戳
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader",
                    publicPath: "/build"
                })
            },
            {
                test: /\.css$/, exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader",
                    publicPath: "/build"
                })
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: 'url-loader?limit=5000&name=img/[name].[chunkhash:8].[ext]'
            },
            {
                test: /\.(png|woff2|woff|ttf|svg|eot)($|\?)/i,
                use: 'url-loader?limit=5000&name=fonts/[name].[chunkhash:8]'
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer];
                }
            }
        }),

        //webpack内置的banner-plugin
        new webpack.BannerPlugin({
            'banner': '版权所有'
        }),

        //html模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        //热更新插件,webpack.这些是webpack自己提供的插件
        new webpack.HotModuleReplacementPlugin(),

        //打开浏览器
        new OpenBrowserPlugin({
            url: 'http://localhost:8088'
        }),

        //定义生产环境，编译react时压缩到最小,会把开发环境的提示和报错都去掉
        new webpack.DefinePlugin({
            'process.env': {//给前端定义的可使用的变量
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)   //process.env.NODE_ENV是node的本身识别的代码
            }
        }),

        //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块,并分配最小的ID
        // new webpack.optimize.OccurrenceOrderPlugin(),  // 新的webpack2默认加载了

        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 暂删除所有的 `console` 语句
                drop_console: false,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),

        //配合使用的分离css的插件
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            disable: false,
            allChunks: true
        }),

        //提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js[name].[hash:8].js'
        }),

        //可在业务js代码中使用__DEV__判断是否是dev模式(dev模式下可以提示错误、测试报告等),production可以在代码中通过process.env.NODE_ENV获取。
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse( (process.env.NODE_ENV == 'dev' ) || 'false' ) )
        })


    ],

    node: {
        fs: "empty"
    }

}