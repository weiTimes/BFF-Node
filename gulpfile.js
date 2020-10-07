const { src, dest, series, task } = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');

const entry = './src/server/**/*.js';
const cleanEntry = './src/server/config/index.js';

function buildDev() {
  // 监听到变化打包
  return watch(entry, { ignoreInitial: false })
    .pipe(
      babel({
        babelrc: false,
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(dest('dist/server'));
}

function buildProd() {
  return src(entry)
    .pipe(
      babel({
        ignore: [cleanEntry],
        babelrc: false,
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(dest('dist/server'));
}

// 清除config无用的代码
function cleanConfig() {
  return src(entry)
    .pipe(
      rollup({
        input: cleanEntry,
        output: {
          format: 'cjs',
        },
        plugins: [
          replace({
            'process.env.NODE_ENV': '"production"', // process.env.NODE_ENV === production => 保留production代码块
          }),
        ],
      })
    )
    .pipe(dest('dist/server'));
}

let build = null;

if (process.env.NODE_ENV === 'development') {
  build = series(buildDev);
}

if (process.env.NODE_ENV === 'production') {
  build = series(buildProd, cleanConfig);
}

task('default', build);
