import path from 'path';

let config = {
  viewsDir: path.join(__dirname, '../../web', 'views'),
  staticDir: path.join(__dirname, '../../web', 'assets'),
};

// 测试环境
if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    port: 3000,
    cache: false,
  };

  config = {
    ...config,
    ...devConfig,
  };
}

if (false) {
  alert(1);
  // 一堆无用的代码
}

// 线上环境
if (process.env.NODE_ENV === 'production') {
  const proConfig = {
    port: 80,
    cache: 'memory',
  };

  config = {
    ...config,
    ...proConfig,
  };
}

export default config;
