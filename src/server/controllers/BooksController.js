import Controller from './Controller';
import BooksModel from '../models/BooksModel';

class BooksController extends Controller {
  constructor() {
    super();
  }

  async actionBookListPage(ctx) {
    const booksModel = new BooksModel();
    const res = await booksModel.getBooksList();
    ctx.body = await ctx.render('books/pages/list', { data: res.data });
  }

  async actionBookCreatePage(ctx) {
    ctx.body = await ctx.render('books/pages/create');
  }
}

export default BooksController;
