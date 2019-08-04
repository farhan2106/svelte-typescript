const path = require('path')
const fs = require('fs-extra')
const { dest, src, watch, series } = require('gulp')
const ts = require('gulp-typescript')
const tap = require('gulp-tap')
const clean = require('gulp-clean')
const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')

const tsProject = ts.createProject('tsconfig.json')

function copyTask () {
  return src([
    'src/assets/**/**'
  ]).pipe(dest('build/assets'))
}

function emptyDirs () {
  return src(['build', 'public'], { read: false, allowEmpty: true })
    .pipe(clean())
}

function combineSvelte () {
  return tsProject.src() // src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(tap(file => {
      const svelteHtmlPath = file.path.replace('build', 'src').replace('.js', '.svelte')
      const svelteSassPath = file.path.replace('build', 'src').replace('.js', '.scss')
      fs.exists(svelteHtmlPath, (exist) => {
        if (exist) {
          const bufferArr = [
            fs.readFileSync(svelteHtmlPath),
            Buffer.from(`\r\n\r\n<script>\r\n`),
            file.contents,
            Buffer.from(`</script>\r\n`),
            Buffer.from(`\r\n\r\n<style>\r\n`),
            fs.readFileSync(svelteSassPath),
            Buffer.from(`</style>\r\n`)
          ]
          file.contents = Buffer.concat(bufferArr)
          file.path = file.path.replace('.js', '.svelte')
        }
      })
    }))
    .pipe(dest('build'))
}

function webpackTask (cb) {
  const compiler = webpack(require('./webpack.config'))
  if (process.env.NODE_ENV !== 'production') {
    new WebpackDevServer(compiler, {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      hot: true
    }).listen(process.env.PORT, 'localhost', err => {
      if (err) throw new Error('webpack-dev-server', err)

      // continue?
      // cb();
    })
  } else {
    webpack(require('./webpack.prod.config')).run((err, stats) => {
      if (err !== null) {
        console.error(chalk.red(err))
      }
  
      if (stats.hasErrors()) {
        console.error(chalk.red(stats.compilation.errors))
      }
  
      if (stats.hasWarnings()) {
        console.warn(chalk.yellow(stats.compilation.warnings))
      }
      cb()
    })
  }
}

const buildTasks = series(copyTask, combineSvelte, webpackTask)

const developmentTasks = series(
  emptyDirs,
  series(copyTask, combineSvelte, webpackTask)
)

if (process.env.NODE_ENV !== 'production') {
  watch(['src/assets/**/**'], series(copyTask))
  watch(['src/**/*.ts', 'src/**/*.scss', 'src/**/*.svelte'], combineSvelte)
}
exports.default = process.env.NODE_ENV !== 'production' ? developmentTasks : buildTasks
