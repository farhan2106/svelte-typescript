const fs = require('fs')
const ts = require('typescript')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsConfig = require('./tsconfig.json')

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    bundle: ['./src/main.ts']
  },
  resolve: {
    extensions: ['.js', '.html', '.svelte', '.ts']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            skipIntroByDefault: true,
            nestedTransitions: true,
            emitCss: true,
            hotReload: true,
            preprocess: {
              script: ({ content, attributes, filename }) => {
                let transpiled
                if (attributes.src) {
                  const filePath = [ 
                    ...filename.split('/').slice(0, (filename.match(/\//g) || []).length),
                    attributes.src
                  ].join('/')
                  transpiled = ts.transpileModule(fs.readFileSync(filePath).toString(), tsConfig)
                } else {
                  transpiled = ts.transpileModule(content, tsConfig)
                }
                return {
                  code: transpiled.outputText,
                  map: transpiled.sourceMapText
                };
              }
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin()
  ],
  devtool: prod ? false: 'source-map'
};

