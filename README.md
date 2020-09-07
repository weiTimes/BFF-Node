## 项目简介
> BFF: Backend For Frontend，即增加一层为前端服务的中间件，可以在这层进行路由控制、接口聚合、跨域等处理。
从零开始搭建BFF架构，会逐步完善成一个企业级的应用，简易的图书管理系统。中间会经历几个阶段，每一个阶段都会记录所完成的功能以及涉及到的知识点。

## 技术栈
* Koa
* Swig
* Php

## 项目结构
|-- assets 静态资源
|-- config 配置文件
|-- controllers 路由控制
|-- middlewares 中间件
|-- views swig模板
|-- .babelrc babel配置文件
|-- app.js 应用入口

## 运行
```
git clone https://github.com/weiTimes/BFF-Node.git
cd BFF-Node
yarn
yarn start
```

## 开始
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
1. cors 让后端支持跨域
2. nodejs 代理，后端请求是不存在跨域的
3. nginx
4. 二级域名的话，可以设置document.domain改成一级域名
5. webSocket 在传输层请求，避免跨域
6. postMessage 设置允许跨域

script、img、link由于浏览器的白名单机制，不会跨域

### 第二阶段
1. 完善MVC
* 完善models
* 完善tests
2. 完善工程化
   * 错误处理-记录错误日志
log4js
   * commonjs => es6 import
@babel/node 编译时转码
   * 格式化后端返回的数据

3. 函数式编程库的编写
* underscore/lodash
* 节流函数
4. 测试
e2e -> rize + puppeteer
mocha/supertest/chai -> node接口测试
