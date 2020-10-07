/*
 * @Author: yewei
 * @Date: 2020-10-06 21:14:36
 * @Last Modified by: yewei
 * @Last Modified time: 2020-10-06 21:49:46
 *
 *  插件
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const pluginName = 'AfterHtmlPlugin';

function createHtml(type, array) {
  let result = '';

  if (type === 'js') {
    array.forEach((url) => {
      result += `<script src="${url}"></script>`;
    });
  }

  if (type === 'css') {
    array.forEach((url) => {
      result += `<link href="${url}" rel="stylesheet"></link>`;
    });
  }

  return result;
}

class AfterHtmlPlugin {
  apply(compiler) {
    //  拿到js, css
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          this.jsArray = data.assets.js;
          this.cssArray = data.assets.css;
          cb(null, data);
        }
      );
    });

    // 重新写入js, css
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          // <!-- injectcss -->
          // <!-- injectjs -->

          const jsStr = createHtml('js', this.jsArray);
          const cssStr = createHtml('css', this.cssArray);

          data.html = data.html.replace('<!-- injectjs -->', jsStr);
          data.html = data.html.replace('<!-- injectcss -->', cssStr);
          cb(null, data);
        }
      );
    });
  }
}

module.exports = AfterHtmlPlugin;
