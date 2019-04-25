const svelteBuild = require('./../configs/svelte-build')

module.exports = ({ config, mode }) => {
  // remove original storybook webpack rules for svelte
  config.module.rules = config.module.rules.filter(r => {
    return !r.test.toString().includes('svelte')
  })

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      }
    ],
  });

  config.module.rules.push({
    test: /\.svelte$/,
    exclude: /node_modules/,
    use: {
      loader: 'svelte-loader',
      options: {
        emitCss: true,
        hotReload: true,
        preprocess: svelteBuild.preprocess
      }
    }
  })

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};