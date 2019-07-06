const merge = require('webpack-merge')
const BrotliPlugin = require('brotli-webpack-plugin')

module.exports = merge(require('./webpack.config'), {
  entry: {
    ie11: '@webcomponents/custom-elements'
  },
  module: {
    rules: [
      {
        // test: /(\.m?js?$)|(\.svelte$)/,
        test: /(\.m?js?$)/,
        exclude: /\bcore-js\b/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 2
              }]
            ],
            sourceType: 'unambiguous'
          }
        }
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // }, 
  plugins: [
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})
