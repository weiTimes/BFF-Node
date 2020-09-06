const Controller = require('./Controller');

class ApiController extends Controller {
  constructor() {
    super();
  }

  actionArray(ctx) {
    ctx.body = [
      {
        name: 'yewei',
      },
    ];
  }
}

module.exports = ApiController;
