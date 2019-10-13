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
[核心相关基础配置](./02_info)
学习配置webpack需要了解四个重要的概念：
- entry
- output
- loader
- plugin
### 3.1 entry
打包的入口文件，可以拥有一个或者多个入口
### 3.2 output
打包结果的存放配置。
### 3.3 loader
webpack默认知道如何打包js文件，但是处理其它的文件需要合适的loader。配置一个loader最基本的需要配置test, use两个属性来决定加载的文件类型和使用的loader相关参数。
#### loader的执行顺序
loader默认从右向左，从下到上的顺序来进行执行，因此，当使用多个loader的时候，先执行的loader放在右边。
#### 3.3.1 css文件
css文件通常使用以下loader
- css-loader可以加载css文件
- style-loader可以将处理好的css插入到页面的style标签内
- mini-css-extract-plugin 可以将样式但文件单独抽离出来进行打包，需要配置loader和plugins
- postcss-loader+autoprefixer 前缀补齐, [浏览器支持配置](https://github.com/browserslist/browserslist#readme)
- optimize-css-assets-webpack-plugin 可以将提取出的css文件进行压缩
#### 3.3.2 文件类型
file-loader 文件类型loader
html-withimage-loader html页面上的图片路径会转换为打包后的文件路径
url-loader  同样可以加载图片，额外的可以限制图片大小，选择打包成base64或者图片

#### 3.3.3 es6支持
es6语法并不能在所以的浏览器上运行。
[babel配置流程](https://babel.docschina.org/setup#installation)

1. npm install babel-loader babel-core --save-dve
2. 配置loader
3. npm install @babel/preset-env --save-dev
4. 配置presets
5. npm install @babel/plugin-transform-runtime -D 为低版本浏览器补充新式语法的支持[官方介绍](https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNav)

#### 3.3.4 js语法校验
- `npm i eslint eslint-loader --save-dev`
- 配置loader
- 创建eslint配置文件.eslintrc.json,配置验证规则


### 3.4 plugin
plugin即插件，可以在webpack运行到某个时刻的时候，自动的完成一些工作。
- html-webpack-plugin处理html模版
### 3.5 source-map
通过devtoop属性可以配置source-map，用来处理错误追踪和定位。source-map是一个映射关系，通过source-map可以从编译结果映射到源码中的位置。

开发推荐： cheap-module-eval-source-map
上线推荐： cheap-module-source-map

### 3.6 监听文件变化

#### 3.6.1 watch
配置watch可以监听代码变化，在代码发生变动的时候重新打包
```
 watch: true,
  watchOptions: {
    // 文件变化多少毫秒后进行打包
    aggregateTimeout: 300,
    // 不需要观测的文件
    ignored: /node_modules/,
    // 传入true或者数值，决定多久查询一次变化
    poll: 1000
  },
```
在webpack-dev-server或者 webpack-dev-middleware中，默认开启watch模式。
#### 3.6.2 webpack-dev-server
`npm install --save-dev webpack-dev-server`
也可以通过webpack-dev-middleware配合express实现webpack-dev-server

## 4. 进阶
### 4.1 Tree Shaking
webpack默认会将所有的文件打包，然而模块中的某些东西并没有用到，所有并不希望将没用到的部分打包进来，这时候就需要Tree Shaking。
注意：

1. 只支持es module引入，即使用import方式引入， 因为es module是静态引入。
2. 配置优化项
```
optimization: {
    // 配置Tree Shaking
    usedExports: true
  },
```
3. 配置package.json
配置不需要使用tree shaking方式处理的包
```
"sideEffects": []/false,
```
4. 在开发环境中并不会将为引用的部分去除掉，而只是做了一些提示，只有在生产环境下才会去除掉

### 4.2开发模式和生产模式

webpack通过mode来区分开发和生产环境。通过webpack-merge可以将配置文件分离出来。[示例](./03_improve)

2.通过环境变量参数，来合并不同配置
npm script中指定: eg `webpack --env.NODE_ENV=local --env.production --progress`

在配置文件中接收传递的环境变量参数

```
module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
  console.log('Production: ', env.production) // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
```

### 4.3 代码分割

将所有资源打包到到单文件的缺点：
1. 打包文件过大
2. 代码发生变化，重新加载时间长
3. 使用第三方类库和公共模块的时候，代码变动少，不需要每次都重新打包


webpack默认支持对动态导入的异步模块进行代码分割，需要安装@babel/plugin-syntax-dynamic-import使支持动态导入，注释的webpackChunkName指定分离出文件的保存文件名称。通过动态导入，可以实现按需加载和懒加载。

对于同步模块，需要使用配置项中优化项中的splitChunks进行配置。

[示例](./03_improve)

### 4.4 打包分析
webpack提供插件，可以对打包结果进行分析和优化，官方网站有推荐的分析插件
### 4.5 预加载

webpack支持预加载，通过/* webpackPrefetch: true */可以在核心代码加载完成之后预加载。

webpackpreload, 和核心代码一起加载。
### 4.6 浏览器缓存与contenthash, runtimeChunk: {name: 'runtime}
浏览器存在缓存的时候会先使用缓存文件，因此，通过webpack打包的代码如果内容发生变化，而打包后的保存的名称不发生变化的情况下，浏览器并不会请求的最新的代码。因此，webpack提供contenthash的功能，每个文件会生成一个hash,当内容发生变化时候，hash会改变，反之则不会改变。
/*TODO:*/
runtimeChunk抽离出mainfest文件，

### 4.7 shimming
垫片，页面注入第三方库或者导出一个全局变量：

- providePlugin, 页面注入模块

- import-loader导出全局变量，挂载到window

### pwa
页面访问过后，离线状态下会显示缓存的东西。webpack存在这样的插件

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