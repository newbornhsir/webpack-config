## 1.webpack配置相关知识

webpack模块化打包工具。

entry, output ,loader, plugin
entry: 入口起点
output: 输出配置
loader: webpack只能识别js， 其它文件需要相应的loader
plugin：扩展功能

## 2.安装
1. webpack需要node环境，需要先安装node
2. 全局安装 `npm i webpack webpack-cli -g `(不推荐)
3. 项目安装 项目目录下执行 `npm i webpack webpack-cli -D`

webpack打包速度与node和webpack版本有关，因此要保持版本更新。

### 配置文件
1. webpack默认寻找目录下webpack.config.js。也可以通过--config来指定配置文件
2. 配置npm script通过npm启动webpack

[demo](./01_start)

## 3.配置
学习配置webpack需要了解四个重要的概念：
- entry
- output
- loader
- plugin
### 3.1 entry
### 3.2 output
### 3.3 loader
webpack默认知道如何打包js文件，但是处理其它的文件需要合适的loader。配置一个loader最基本的需要配置test, use两个属性来决定加载的文件类型和使用的loader相关参数。
#### loader的执行顺序
loader默认从右向左，从下到上的顺序来进行执行，因此，当使用多个loader的时候，先执行的loader放在右边。
#### 3.3.1 css文件
css文件通常使用以下loader
- css-loader可以加载css文件
- style-loader可以将处理好的css插入到页面的style标签内
- mini-css-extract-plugin 可以将样式但文件单独抽离出来进行打包，需要配置loader和plugins
- postcss-loader+autoprefixer 前缀补齐
- optimize-css-assets-webpack-plugin 可以讲提取出的css文件进行压缩
#### 3.3.2 文件类型
file-loader 文件类型loader
html-withimage-loader html页面上的图片路径会转换为打包后的文件路径
url-loader  限制图片大小，选择打包成base64或者图片


## webpack-dev-server构建开发服务器

## html-webpack-plugin处理html模版

## loader加载其它文件

### css文件

style-loader, css-loader, mini-css-extract-plugin抽离css文件

postcss-loader autoprefixer 前缀补齐
配置loader, 创建postcss.config.css,这时候看页面并不显示补齐前缀，需要配置浏览器支持信息，
Use browserslist key in package.json or .browserslistrc file.
https://github.com/browserslist/browserslist#readme

css压缩
在production模式下，webpack自动压缩js，但是插件提取出的css不会被压缩
css压缩插件
npm install --save-dev optimize-css-assets-webpack-plugin

### 图片文件

file-loader,html-withimage-loader, url-loader限制图片大小，选择使用base64或者图片


### es6转es5
https://babel.docschina.org/setup#installation
webpack默认不会转换es6到es5，需要使用babel
安装babel

配置rule
配置.babelrc
安装@babel/preset-env进行语法转换
npm install @babel/preset-env --save-dev
{
  "presets": ["@babel/preset-env"]
}

@babel/plugin-transform-runtime

https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNav

js 语法校验
eslint eslint-loader

.eslintrc.json


### 暴露全局变量

全局loader
pre loader
normal loader
内联loader
后置loader

1. 使用loader expose-loader
或者 webpack配置loader

2. webpack配置

在每个模块中都注入$
new webpack.ProvidePlugin({
  $: 'jquery'
})

### 打包文件分类

output


### 多页

多入口

多出口[name]

多模版

多次调用html-webpack-plugin, chunks: [name1, name2]

### source map
devtool
生成映射文件，方便错误调试

eval-source-map 不会生成映射文件
不会产生列，但是是一个单独映射文件
cheap-module-source-map
不会产生文件，集成在文件中，不会产生列
cheap-module-eval-source-map

### WATCH
watch 监控文件，实时打包， webpack-dev-server不会生成打包文件


### clean-webpack-plugin

每次打包的时候清空上次内容


### bannerplugin
内置版权插件

### 跨域问题
proxy

1. express
2. 单纯模拟 before
3. 有服务器

### resolve
解析第三方包
resolve: {
  modules: [],
  alias: {
    bootstrap: 'path
  },
  mainFields: [],
  mainFiles: [],
  extensions: ['.js', '.css']
}

### 定义环境变量
new webpack.DefinePlugin({
  DEV: "'dev'", 会去掉单引号
})

### webpack-merge

### 优化

noParse: 不解析的模块

rule中 exclude

webpack.IgnorePlugin


tree-shaking, 支持import

webpack自动简化一些代码 1+1 编程2

### 动态连接库
？？DLLReferencePlugin

### happypack

实现多线程打包

### 抽取公共代码

optimization: {
  splitChunks: {
    cacheGroups: {
      common: {

      },
      vendor: {
        // 第三方
        priority: 1
      }
    }
  }
}

###  懒加载

import()

### 热更新

hot true

HotModuleReplacementPlugin 热更新插件
NamedModulesPlugin 打印路径

### tapable