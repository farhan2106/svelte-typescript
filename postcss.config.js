const path = require('path')

const plugins = [
 require('autoprefixer')(),
 require('postcss-preset-env')(),
 require('postcss-import')({
   path: [
     path.join(__dirname, '/src')
   ]
 })
]

if (process.env.NODE_ENV === 'production') {
  plugins.unshift(require('cssnano')({
    preset: 'default',
  }));
}

module.exports = {
  plugins
}
