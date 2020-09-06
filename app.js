const Koa = require('koa');
const render = require('koa-swig');
const co = require('co');
const staticServer = require('koa-static');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');

const config = require('./config');
const initController = require('./controllers');
const errorHandler = require('./middlewares/errorHandler');

const app = new Koa();

// swig初始化
app.context.render = co.wrap(
  render({
    root: config.viewsDir,
    cache: config.cache,
    varControls: ['[[', ']]'],
  })
);

// ------初始化中间件
// 静态资源服务 assets
app.use(staticServer(config.staticDir));
// koa2支持单页应用
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
// 错误处理
errorHandler.error(app);

// 初始化路由
initController(app);

app.listen(config.port, () => {
  console.log(`Server is running at https://localhost:${config.port}`);
});
