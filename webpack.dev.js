const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: false
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                     { 
                        loader: 'css-loader', 
                        options: { 
                            importLoaders: 1,  
                            minimize: false
                        } 
                    },//将 CSS 转化成 CommonJS 模块
                    'postcss-loader',
                    'sass-loader',//将 Sass 编译成 CSS
                ]
            },
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});