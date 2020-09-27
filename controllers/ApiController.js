import Controller from './Controller';
import BooksModel from '../models/BooksModel';

class ApiController extends Controller {
  constructor() {
    super();
  }

  async actionBookList(ctx) {
    const booksModel = new BooksModel();
    ctx.body = await booksModel.getBooksList();
  }
}

export default ApiController;
