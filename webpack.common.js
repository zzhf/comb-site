const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['jquery', 'lodash'],
        app: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude : path.resolve(__dirname,'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']//告诉 babel 要引用 runtime 来代替注入。
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1,  minimize: true } },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader', 
                            options: { 
                                importLoaders: 1,  
                                minimize: true 
                            } 
                        },//将 CSS 转化成 CommonJS 模块
                        'postcss-loader',
                        'sass-loader',//将 Sass 编译成 CSS
                    ]
                }),
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ],
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ],
            }
        ]
    },
    plugins: [
        /*
         * clean publishing directory
         * （发布前清空发布目录）
         * */
        new CleanWebpackPlugin('[dist]', {
            root: '', //webpack.config.js文件的绝对路径
            verbose: true,// 是否输出日志到控制台
            dry: true // 是否全部都删除
        }),

        /*
         * 提取css
         */
        new ExtractTextPlugin('[name]-[contenthash].css'),

        /*
         * 页面模板
         **/
        new HtmlWebpackPlugin({
            title: 'cbg',
            //输出文件路径
            filename: __dirname + '/dist/index.html',
            favicon: './favicon.png',
            //html模板
            // template: './template.html',
            //js插入的位置，true/'head'  false/'body'
            inject: true,
            //指定页面引入的chunk,默认为所有entry中的chunk
            chunks: ['vendor', 'app'],
            //是否为引入的chunks增加hash,引导浏览器正确的缓存文件
            // hash: true,
            //html压缩配置
            minify: {
                //是否移除html中的注释
                removeCommets: true,
                //是否删除空白符与换行符
                collapseWhitespace: false
            }
        }),
        
        /*
         * 提取公共脚本插件
         **/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',//忽略则以name为输出文件的名字，否则以此为输出文件名字
            minChunk: Infinity,
        }),
    ],
};