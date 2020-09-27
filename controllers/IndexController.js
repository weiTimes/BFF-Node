import Controller from './Controller';

class IndexController extends Controller {
  constructor() {
    super();
  }

  async actionIndex(ctx) {
    // throw new Error('自定义错误');
    ctx.body = await ctx.render('index', {
      message: '后端渲染的数据',
    });
  }
}

export default IndexController;
