const CopyPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[contenthash].js', // 内容不变hash就不会变
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()], // 压缩css
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/web/views/layout'),
          to: '../views/layout',
          transform: function (content) {
            // 压缩html
            return minify(content.toString(), {
              collapseWhitespace: true,
            });
          },
        },
        {
          from: path.join(__dirname, '../src/web/components'),
          to: '../components',
          transform: function (content) {
            return minify(content.toString(), {
              collapseWhitespace: true,
            });
          },
        },
        {
          from: path.join(__dirname, '../src/web/views/index.html'),
          to: '../views',
        },
      ],
    }),
  ],
};
