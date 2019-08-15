const path = require('path');
// 将css文件提取出来单独打包
const ExtractCssPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizationCss = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
      }
    ]
  },
  plugins: [
    new OptimizationCss(),
    new ExtractCssPlugin(),
    new HtmlWebpackPlugin()
  ]
};