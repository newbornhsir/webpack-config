const path = require('path');
// 将css文件提取出来单独打包
const ExtractCssPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizationCss = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  // entry: path.join(__dirname, 'index.js'),
  /**单入口的时候，可以简写成注释掉的部分 */
  entry: {
    main: path.join(__dirname, 'index.js')
  },
  output: {
    /**占位符， [name], [hash] */
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 放入服务器上的地址
    // publicPath: './',
    // 暴露library
    library: 'custom'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    // 开启热更新, 只更新发生变化的部分而不是全部刷新
    //TODO: 这里热更新并没有生效？
    hot: true,
    hotOnly: true,
    open: true
  },
  module: {
    /**
     * loader的相关配置  
     */
    rules: [
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            /**
             * 额外的配置
             */
            // 通过占位符，保持打包后文件名一致
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        },
      }, {
        test: /\.css/,
        use: [ExtractCssPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            /**css modules*/
            modules: true
          }
        }, 'postcss-loader']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // 新版本es语法在低版本浏览器中的补充
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  /**
   * 插件的配置
   */
  plugins: [
    new OptimizationCss(),
    new ExtractCssPlugin(),
    new HtmlWebpackPlugin({
      /**需要注入到页面的bundle文件 */
      chunks: ['main']
    }),
    new CleanWebpackPlugin(),
    // 开启热更新
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};