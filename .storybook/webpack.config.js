const fs = require('fs')
const ts = require('typescript')
const tsConfig = require('./../tsconfig.json')
module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      }
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};