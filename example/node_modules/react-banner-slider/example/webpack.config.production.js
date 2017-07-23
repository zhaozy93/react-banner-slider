var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
  entry: {
    app: './src/banner.jsx'
    // base: ['react', 'react-dom', 'babel-polyfill', 'classnames', 'object.omit', 'es5-shim', 'es5-shim/es5-sham']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(png|jpg|woff|eot|ttf|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.less$/,
        // 配置less的抽取器、加载器。中间!有必要解释一下，
        // 根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
        // 你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function (){
          return [
            require('autoprefixer')
          ];
        }
      }
    }),
    extractCSS,
    extractLESS,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        except: ['super', 'exports', 'export', 'require', 'import', 'React', 'state', 'this']
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
    //   chunks: ['app'], //提取哪些模块共有的部分
    //   minChunks: 3 // 提取至少3个模块共有的部分
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'base',
      filename: 'base.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
      filename: 'index.html', // 生成的html存放路径，相对于path
      template: './src/index.html', // html模板路径
      inject: 'body', // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值
      chunks: ['base', 'app'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false  // 删除空白符与换行符
      }
    }),
    new TransferWebpackPlugin([
      {
        from: 'src/static',
        to: 'static'
      }
    ])
  ]
};
