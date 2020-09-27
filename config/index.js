import path from 'path';

let config = {
  viewsDir: path.join(__dirname, '../', 'views'),
  staticDir: path.join(__dirname, '../', 'assets'),
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
