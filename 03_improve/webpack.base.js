const path = require('path');
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
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  plugins: []
};