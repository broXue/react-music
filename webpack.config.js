var path  = require('path');//nodejs的path模块
var webpack  = require('webpack');//webpack模块
var HtmlWebpackPlugin  = require('html-webpack-plugin');//
var OpenBrowserPlugin  = require('open-browser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/index.js'),
    output: {
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader'
                    ,'css-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: [
                    'url-loader?limit=5000'
                ]
            },
            {
                test: /\.(png|gif|woff2|woff|ttf|svg|eot)($|\?)i/,
                use: [
                    'url-loader?limit=5000'
                ]
            }
        ]
    },

    // expose-loader，这个loader的作用是，将指定js模块export的变量声明为全局变量。下面来看下expose-loader的配置

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer];
                }
            }
        }),

        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        //热更新插件,webpack.这些是webpack自己提供的插件
        new webpack.HotModuleReplacementPlugin(),

        //可在业务js代码中使用__DEV__判断是否是dev模式(dev模式下可以提示错误、测试报告等),production可以在代码中通过process.env.NODE_ENV获取。
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse( (process.env.NODE_ENV == 'dev' ) || 'false' ) )
        }),

        // ProvidePlugin的机制是：当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，
        // 会自动require配置中value所指定的js模块。
        new webpack.ProvidePlugin({
            // $: 'jquery',
            // PT: 'prop-types',
            // React: 'react'
        })

    ],

    devServer: {
        port: 9000,
        historyApiFallback: true, //不跳转，在单页开发中很有用，它依赖HTML5 history api,如果设置为true的话，所有的页面跳转都将指向index.ht
        inline: true, // 实时刷新
        // hot: true //使用热加载插件
    }

}