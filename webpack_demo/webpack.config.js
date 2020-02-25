const path = require('path');
//const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const entry = require('./webpack_config/entry_webpack.js');
const webpack = require('webpack');

let website;
if (process.env.type === 'build') {
  website = {
    publicPath: 'http://localhost:1818/'
  };
} else {
  website = {
    publicPath: 'http://127.0.0.1:1818/'
  };
}

module.exports = {
    devtool: 'esource-map',

    // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] <----- if you want to customize it.
    optimization:{
        minimize: false, // <---- disables uglify.
        // minimizer: [new UglifyJsPlugin()] <----- if you want to customize it.
    },

    //入口文件的配置项
    entry: entry.path,

    //出口文件的配置项
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath:website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
      rules: [
        {
          test: /\.css$/,
          // use: [ 'style-loader', 'css-loader' ],
          // loader: [ 'style-loader', 'css-loader' ],
          // use: [{
          //   loader: 'style-loader'
          // }, {
          //   loader: 'css-loader'
          // }]
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: 'css-loader', options: { importLoaders: 1 }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [
                    require('autoprefixer')({
                      'browsers': ['> 1%', 'last 2 versions']
                    }),
                  ]
                }
              }
            ]
          })
        }, {
          test: /\.(png|jpg|gif)/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 5000,
              outputPath:'images/',
              esModule: false
            }
          }]
        }, {
          test: /\.(htm|html)$/,
          use: [{
            loader: 'html-withimg-loader'
          }]
        }, {
          // test: /\.less$/,
          // use: [{
          //   loader: 'style-loader' // creates style nodes from JS strings
          // }, {
          //   loader: 'css-loader' // translates CSS into CommonJS
          // }, {
          //   loader: 'less-loader' // compiles Less to CSS
          // }]
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'less-loader'
            }],
            // use style-loader in development
            fallback: 'style-loader'
          })
        }, {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
            }, {
              loader: 'sass-loader'
            }],
            fallback: 'style-loader'
          })
        }, {
          test: /\.(jsx|js)$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /node_modules/
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
      }),
      new ExtractTextPlugin('css/index.css'),
      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*.html')),
      }),
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
      new webpack.BannerPlugin('This is my testing for webpack learning!')
    ],
    //配置webpack开发服务功能
    devServer:{
      contentBase: path.resolve(__dirname, 'dist'),
      host: 'localhost',
      compress: true,
      port: 1818
    },
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/
    }
};