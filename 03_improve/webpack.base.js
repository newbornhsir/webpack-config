const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  // entry: path.join(__dirname, 'index.js'),
  /**单入口的时候，可以简写成注释掉的部分 */
  entry: {
    main: path.join(__dirname, 'index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: {
      name: 'mainifest'
    },
    /**tree Shaking */
    usedExports: true,
    splitChunks: {
      // 代码分割需要处理的模块,可以是函数或者字符串：async, all, initial
      chunks: 'all',
      minSize: 30000,
      // 模块最少引用的次数才会被分割
      minChunks: 1,
      // 同时加载的模块最多是5个
      maxAsyncRequests: 5,
      // 入口文件加载的时候最多3个
      maxInitialRequests: 3,
      // 文件连接符
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // 第三方库分离配置
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级，按照优先级，将符合的模块打包到对应文件
          priority: -10,
          // 文件保存的名称
          filename: 'vendor.js'
        },
        default: {
          priority: -20,
          // 如果模块被打包过了，再次打包会忽略
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  },
  module: {
    /**
     * loader的相关配置  
     */
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // 新版本es语法在低版本浏览器中的补充
            plugins: ["@babel/plugin-transform-runtime","@babel/plugin-syntax-dynamic-import"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    /**shimming */
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
};