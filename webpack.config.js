const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getEntry() {
  var jsPath = path.resolve('./src', '');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [],
    files = {};
  dirs.forEach(function(item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = path.resolve('./src', '', item);
    }
  });
  return files;
}

module.exports = {
  context: path.resolve(__dirname, './src'),
  node: {
    fs: 'empty'
  },
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, './dist/static'),
    filename: 'js/[name].min.js',
    publicPath: '/static'
  },
  module: {
    rules: [
        // {
        // test: /\.(js|vue)$/,
        // loader: 'eslint-loader',
        // exclude: /node_modules/,
        // enforce: 'pre',
        // options: {
        //   formatter: require('eslint-friendly-formatter')
        // }
      // },
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
          presets: ['es2015', 'react']
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
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'css/app.css' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      // {output}/to/file.txt
      { from: './**.html', to: '../' }
    ]),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './src'), // New
  }
};
