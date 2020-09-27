import Router from '@koa/router';
import IndexController from './IndexController';
import ApiController from './ApiController';
import BooksController from './BooksController';

const router = new Router();

const indexController = new IndexController();
const apiController = new ApiController();
const booksController = new BooksController();

function initController(app) {
  router.get('/', indexController.actionIndex); // 渲染views/index.html
  router.get('/api/getBookList', apiController.actionBookList);
  router.get('/books/list', booksController.actionBookListPage);

  app.use(router.routes()).use(router.allowedMethods());
}

export default initController;
