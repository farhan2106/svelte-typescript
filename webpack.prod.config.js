const merge = require('webpack-merge')
const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(require('./webpack.config'), {
  entry: {
    '11': '@webcomponents/custom-elements'
  },
  module: {
    rules: [
      {
        test: /(\.m?js?$)/,
        exclude: /\bcore-js\b/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'entry',
                corejs: 3
              }]
            ],
            sourceType: 'unambiguous'
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },
  plugins: [
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin()
  ]
})
