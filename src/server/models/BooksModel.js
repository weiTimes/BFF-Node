import SafeRequest from '../utils/safeRequest';

class BooksModel {
  getBooksList() {
    return SafeRequest.fetch('后端的 php 接口地址');
  }

  findBook(id) {}
}

export default BooksModel;
