const path = require('path')

module.exports = {
  // parser: 'sugarss',
  plugins: [
    require('cssnano')({
      preset: 'default',
    }),
    require('autoprefixer')(),
    require('postcss-preset-env')(),
    require('postcss-import')({
      path: [
        path.join(__dirname, '/src')
      ]
    })
  ]
}
