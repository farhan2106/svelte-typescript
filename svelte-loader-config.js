const sass = require('node-sass')
const postcss = require('postcss')

module.exports = (dev) => {
  return {
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
      hotReload: false, // https://github.com/sveltejs/svelte/issues/2377 || https://github.com/sveltejs/svelte/pull/3148
      hotOptions: {
        // will display compile error in the client, avoiding page reload on error
        optimistic: false
      },
      dev
    }
  }
}
