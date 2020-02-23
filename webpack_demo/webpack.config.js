const path = require('path');
//const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] <----- if you want to customize it.
    optimization:{
        minimize: false, // <---- disables uglify.
        // minimizer: [new UglifyJsPlugin()] <----- if you want to customize it.
    },

    //入口文件的配置项
    entry: {
      entry: './src/entry.js',
      entry2: './src/entry2.js'
    },
    //出口文件的配置项
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
      rules: [
        {
          test: /\.css$/,
          // use: [ 'style-loader', 'css-loader' ],
          // loader: [ 'style-loader', 'css-loader' ],
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }]
        }, {
          test: /\.(png|jpg|gif)/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 500000
            }
          }]
        }
      ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
      //new uglify()
      new HtmlWebpackPlugin({
        minify: {
          removeAttributeQuotes: true
        },
        hash:true,
        template:'./src/index.html'
      })
    ],
    //配置webpack开发服务功能
    devServer:{
      contentBase: path.resolve(__dirname, 'dist'),
      host: 'localhost',
      compress: true,
      port: 1818
    }
};