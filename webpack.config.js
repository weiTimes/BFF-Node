const { argv } = require('yargs');
const { merge } = require('webpack-merge');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 判断打包的环境
// 遍历所有的入口文件（多页应用）

const entryFiles = glob.sync('./src/web/views/**/*.entry.js'); // 获取所有的入口文件
const htmlPlugins = [];

const entrys = {};

entryFiles.forEach((file) => {
  if (/([a-zA-Z]+-[a-zA-Z]+)\.entry\.js/.test(file)) {
    const entryKey = RegExp.$1;
    const [pageName, actionName] = entryKey.split('-');
    entrys[entryKey] = `./src/web/views/${pageName}/${entryKey}.entry.js`;

    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: `./src/web/views/${pageName}/pages/${actionName}.html`,
      })
    );
  }
});

// 公共的配置
const baseConfig = {
  mode: argv.mode,
  entry: entrys,
  output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [...htmlPlugins],
};

const envConfig = require(`./config/webpack.${argv.mode}.js`);

module.exports = merge(baseConfig, envConfig);
