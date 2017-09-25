const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
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
