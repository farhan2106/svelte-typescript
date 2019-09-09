const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sass = require('node-sass')
const postcss = require('postcss')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

// https://webpack.js.org/plugins/compression-webpack-plugin/
// https://webpack.js.org/guides/code-splitting/

const svelteLoaders = [require('./svelte-loader-config')(!prod)]

if (prod) {
  svelteLoaders.unshift({
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
  })
}

module.exports = {
  entry: {
    bundle: [
      "core-js",
      "regenerator-runtime/runtime",
      './build/main.js'
    ]
  },
  resolve: {
    extensions: ['.js', '.html', '.svelte', '.css', '.mjs']
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: svelteLoaders
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Flood',
      inject: 'body',
      template: 'index.tmpl',
    }),
  ],
  devtool: 'source-map'
}
