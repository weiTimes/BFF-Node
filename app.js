import Koa from 'koa';
import render from 'koa-swig';
import co from 'co';
import staticServer from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import log4js from 'log4js';

import config from './config';
import initController from './controllers';
import errorHandler from './middlewares/errorHandler';

const app = new Koa();

log4js.configure({
  appenders: { globalError: { type: 'file', filename: './logs/error.log' } },
  categories: { default: { appenders: ['globalError'], level: 'error' } },
});
const logger = log4js.getLogger('cheese');
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
app.use(historyApiFallback({ index: '/', whiteList: ['/api', '/books'] }));
// 错误处理
errorHandler.error(app, logger);

// 初始化路由
initController(app);

app.listen(config.port, () => {
  console.log(`Server is running at https://localhost:${config.port}`);
});
