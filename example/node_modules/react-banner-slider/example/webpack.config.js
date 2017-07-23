var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', './src/app.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
        // 如果兼容IE8 es3则引入'es3ify-loader'
      },
      {
        test: /\.(png|jpg|woff|eot|ttf|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.less$/,
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
        NODE_ENV: JSON.stringify('development')
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
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', // 生成的html存放路径，相对于path
      template: './src/index.html', // html模板路径
      inject: 'body', // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值
      chunks: ['app'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:4444/'
    }),
    new TransferWebpackPlugin([
      {
        from: 'src/static',
        to: 'static'
      }
    ])
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    overlay: true,
    contentBase: './dist',
    host: '0.0.0.0',
    port: 4444,
    inline: true
  }
};
