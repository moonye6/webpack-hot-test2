const Koa = require('koa2');
const http = require('http');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const mount = require('koa-mount');
const serveStatic = require('koa-static');
const convert = require('koa-convert')
const webpackMiddleware = require('koa-webpack');
const config = require('./webpack.config.babel');
const debug = require('debug');
const path = require('path');

const app = new Koa();
app.use(koaLogger());
app.use(bodyParser());
app.use(mount('/', serveStatic(path.resolve(`${__dirname}/dist`))));

app.use(webpackMiddleware({
  config: config,
  dev: {
    noInfo: false,
    publicPath: config.output.publicPath,
  }
}));

const server = http.createServer(app.callback());
server.listen(8080, () => {
  console.log('server running at http://127.0.0.1:8080');
});