const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    home: './demo2/home.js',
    other: './demo2/other.js'
  },
  output: {
    // name是entry对应入口文件的键名，以此来进行区分
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'a'
  },
  devtool: 'source-map',
  // watch: true,
  // watchOptions: {
  //   // 文件变化多少毫秒后进行打包
  //   aggregateTimeout: 300,
  //   // 不需要观测的文件
  //   ignored: /node_modules/,
  //   // 传入true或者数值，决定多久查询一次变化
  //   poll: 1000
  // },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        // 忽律 node_modules目录
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'home.html',
      template: './template/index.html',
      chunks: ['home'], // 相关页面的资源文件
    }),
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'other.html',
      template: './template/index.html',
      chunks: ['other']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new OptimizeCssAssetsPlugin()
  ]
};