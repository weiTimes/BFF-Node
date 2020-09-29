class ErrorHandler {
  static error(app, logger) {
    // 全局错误
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(error);
        ctx.body = '500请求，服务器正在修复中...';
      }
    });

    // 处理页面的404
    app.use(async (ctx, next) => {
      await next();

      if (ctx.status === 404) {
        // 腾讯公益404页
        ctx.body =
          '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
      }
    });
  }
}

export default ErrorHandler;
