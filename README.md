# webpack-hot-test2
> webpack热更新demo，使用koa2作为服务器，搭配koa-webpack插件实现热更新
> demo中使用的前端代码使用react实现

### demo启动方式
- 第一步 npm i
- 第二步 npm start
- 打开浏览器 http://127.0.0.1:8080/index.html

### 详细步骤描述
首先， 我们需要一个中间件，嵌入到server中（server以koa2为例）

```
npm i —save koa-webpack
```

> koa-webpack其中主要依赖两个包webpack-dev-middleware和webpack-hot-middleware, 拆开来使用也可以，配置也都类似

第二步，修改构建配置文件

之前这里是使用server来刷新内容的，这种场景下是去掉了`webpack-dev-server`插件而使用`webpack-hot-middleware`实现

```
entry: {
    index: ['react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/index.js'
    ]
  }
```

第三步，在server中require这个中间件

```
const webpackMiddleware = require('koa-webpack');
const config = require('./webpack.config.babel');
```

第四步， 配置server所需要的参数

这里主要是`config`参数和`dev.publicPath`,其他参数可选而已，这里列出来看看

```
app.use(webpackMiddleware({
    config: config,
    dev: {
      publicPath: config.output.publicPath,
      // public path to bind the middleware to
      // use the same as in webpack
      // publicPath is required, whereas all other options are optional
      noInfo: false
    }
  }));
```

第五步，修改启动server

```
const http = require('http');
const server = http.createServer(app.callback());
server.listen(8080, () => {
  console.log('server running at http://127.0.0.1:8080');
});
```

启动程序后查看效果，修改代码后直接看浏览器内容是否更新
