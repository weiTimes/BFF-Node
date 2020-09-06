### 第一阶段
* 区分环境
NODE_ENV = development | production
* 自动更新代码
nodemon
* 路由
@koa-router
* koa-static
配置静态服务的路径
* koa2-connect-history-api-fallback
让Koa2支持SPA应用，当刷新前端路由时会将其重定向到index.html，保证刷新后仍然可以正常访问
* 页面路由解析过程
/about -> 后端 /about -> 404 -> Fallback中间件 -> 后端 / -> views/index.html -> /about被vue-router拦截到 -> /about
* es6 module以及system.js
babel => data.js
`yarn add @babel/core @babel/core @babel/plugin-transform-modules-systemjs`
* 如果不支持nomodule(safari)
  https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
  ```
  (function() {
  var check = document.createElement('script');
  if (!('noModule' in check) && 'onbeforeload' in check) {
    var support = false;
    document.addEventListener('beforeload', function(e) {
      if (e.target === check) {
        support = true;
      } else if (!e.target.hasAttribute('nomodule') || !support) {
        return;
      }
      e.preventDefault();
    }, true);

    check.type = 'module';
    check.src = '.';
    document.head.appendChild(check);
    check.remove();
  }
}());
```
* 跨域的解决方案
跨域：协议、域名、端口不同
- cors 让后端支持跨域
- nodejs 代理，后端请求是不存在跨域的
- nginx
- 二级域名的话，可以设置document.domain改成一级域名
- webSocket 在传输层请求，避免跨域
- postMessage 设置允许跨域

script、img、link由于浏览器的白名单机制，不会跨域
