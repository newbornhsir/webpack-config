const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/**
 * style-loader将css插入到html中的style标签中
 * mini-css-extract-plugin将css提取到文件，通过link标签引入
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './demo1/test.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo1'),
    compress: true,
    port: 9000,
    before: function (app) {
      app.get('/api/test', function(req, res) {
        res.json({ custom: 'response' });
      });
      app.get('/api/test2', function(req, res) {
        res.json({ custom: 'responses' });
      });
      app.get('/api/test23', function(req, res) {
        res.json({ custom: 'responses3' });
      });
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']// loader默认从右向左执行, 从下向上执行
      // }
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']// loader默认从右向左执行
      },
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: "eslint-loader",
          options: {
            enforce: "pre"
          }
        }
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: './template/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new OptimizeCssAssetsPlugin()
  ]
}