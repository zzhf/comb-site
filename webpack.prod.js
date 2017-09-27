const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    module: {
        rules: [
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
                                importLoaders: 2,  
                                minimize: true 
                            } 
                        },//将 CSS 转化成 CommonJS 模块
                        'postcss-loader',
                        'sass-loader',//将 Sass 编译成 CSS
                    ]
                }),
            },
        ]
    },
    plugins: [
        /*
         * 提取css
         */
        new ExtractTextPlugin('[name]-[contenthash].css'),
        new UglifyJSPlugin({//代码压缩
            sourceMap: true
        }),
        new webpack.DefinePlugin({//指定环境，移除library可能在调试环境添加的额外的日志和测试
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]
});
