const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    node: {
        fs: 'empty'
    },
    entry: {
        app: './app.js',
        vue: './vue.js',
        react: './react.js',
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: '[name].min.js',
        publicPath: '/js'
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: 'css-loader',
            use: ExtractTextPlugin.extract({
                use: ['css-loader']
            })

        },
        {
            test: /\.less$/,
            use: [
            'style-loader',
            'less-loader'
            ],
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              //resolve-url-loader may be chained before sass-loader if necessary 
              use: ['css-loader', 'less-loader']
          })
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'

        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            /* 排除模块安装目录的文件 */
            exclude: /node_modules/,
            query: {
                presets: ['es2015','react']
            }
        },
        {
            test: /\.scss$/,
            use: [
            'style-loader',
            'sass-loader'
            ],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
              //resolve-url-loader may be chained before sass-loader if necessary 
              use: ['css-loader', 'sass-loader','postcss-loader']
          })
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/app.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './src'),  // New
    }
};