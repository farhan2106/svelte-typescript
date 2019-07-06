const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sass = require('node-sass')
const postcss = require('postcss')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

// https://webpack.js.org/plugins/compression-webpack-plugin/

module.exports = {
  entry: {
    bundle: './build/main.js'
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
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: {
              style: async (input) => {
                const postCssOpts = {
                  from: input.filename.replace(__dirname, '').replace('.svelte', '.css'),
                  to: input.filename.replace(__dirname, '').replace('/build/', '/src/')
                }
                let result = sass.renderSync({
                  data: input.content
                })
                result = await postcss(require('./postcss.config')).process(result.css.toString(), postCssOpts)
                return {
                  code: result.css.toString()
                }
              }
            },
            emitCss: true,
            hotReload: true, // Using a forked version of svelte-loader "github:rixo/svelte-loader#hmr"
            hotOptions: {
              // will display compile error in the client, avoiding page reload on error
              optimistic: false
            },
            dev: !prod
          }
        }
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
      inject: false,
      template: 'index.tmpl'
    })
  ],
  devtool: prod ? false : 'source-map'
}
