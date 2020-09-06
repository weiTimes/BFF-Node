const Router = require('@koa/router');
const IndexController = require('./IndexController');
const ApiController = require('./ApiController');

const router = new Router();

const indexController = new IndexController();
const apiController = new ApiController();

function initController(app) {
  router.get('/', indexController.actionIndex); // 渲染views/index.html
  router.get('/api/getData', apiController.actionArray);

  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = initController;
