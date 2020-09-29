import path from 'path';

let config = {
  viewsDir: path.join(__dirname, '../../web', 'views'),
  staticDir: path.join(__dirname, '../../web', 'assets'),
};

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
