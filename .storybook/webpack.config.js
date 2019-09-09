module.exports = ({ config, mode }) => {
  // remove original storybook webpack rules for svelte
  config.module.rules = config.module.rules.filter(r => {
    return !r.test.toString().includes('svelte')
  })

  config.module.rules.push({
    test: /\.svelte$/,
    exclude: /node_modules/,
    use: require('./../svelte-loader-config')(mode === 'DEVELOPMENT')
  })

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};