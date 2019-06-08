const path = require('path')
const fs = require('fs-extra')
const { dest, src, watch, series } = require('gulp')
const ts = require('gulp-typescript')
const tap = require('gulp-tap')
const clean = require('gulp-clean')
const sass = require('gulp-sass')
const postcss = require("gulp-postcss")
const atImport = require("postcss-import")
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const tsProject = ts.createProject('tsconfig.json')

function copyTask () {
  return src(['src/assets/**/**']).pipe(dest('build/assets'));
}

function emptyDirs () {
  return src(['build', 'public'], { read: false, allowEmpty: true })
          .pipe(clean())
}

function scriptSvelte () {
  return src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(tap(function(file) {
      const svelteHtmlPath = file.path.replace('build', 'src').replace('.js', '.svelte')
      if (fs.existsSync(svelteHtmlPath)) {
        const bufferArr = [
          fs.readFileSync(svelteHtmlPath),
          Buffer.from(`\r\n\r\n<script>\r\n`),
          file.contents,
          Buffer.from(`</script>\r\n`),
        ]
        file.contents = Buffer.concat(bufferArr);
        file.path = file.path.replace('.js', '.svelte')
      }
    }))
    .pipe(dest('build'))
}

function styleSvelte () {
  return src('src/**/*.scss')
    .pipe(sass())
    .pipe(postcss([
      atImport({
        path: [
          __dirname + '/src',
        ]
      })
    ]))
    .pipe(tap(function(file) {
      const svelteHtmlPath = file.path.replace('.css', '.svelte')
      if (fs.existsSync(svelteHtmlPath)) {
        const bufferArr = [
          Buffer.from(`\r\n\r\n<style>\r\n`),
          file.contents,
          Buffer.from(`</style>\r\n`),
        ]
        file.contents = Buffer.concat(bufferArr);
        file.path = svelteHtmlPath
      }
    }))
    .pipe(dest('build', { overwrite: true, append: true }))
}

function webpackTask () {
  const compiler = webpack(require('./webpack.config'));
  // compiler.run(cb())

  new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'public'),
    compress: true
  }).listen(process.env.PORT, "localhost", err => {
    if (err) throw new Error("webpack-dev-server", err)

    // continue?
    // cb();
  });
}

const buildTasks = series(copyTask, scriptSvelte, styleSvelte, webpackTask)

const developmentTasks = series(
  emptyDirs, 
  series(copyTask, scriptSvelte, styleSvelte, webpackTask)
)

process.env.NODE_ENV !== 'production' && watch(['src/**/*.*'], series(copyTask, scriptSvelte, styleSvelte))
exports.default = process.env.NODE_ENV !== 'production' ? developmentTasks : buildTasks
