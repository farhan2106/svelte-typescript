import svelte from 'rollup-plugin-svelte';
import typescript from 'rollup-plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import html from 'rollup-plugin-bundle-html'
import packageJson from './package.json'
const svelteBuild = require('./configs/svelte-build')

module.exports = {
  input: './src/main.ts',
  output: {
    name: packageJson['name'],
    file: 'public/bundle.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    postcss({
      extensions: ['.css']
    }),
    typescript(),
    svelte({
      preprocess: svelteBuild.preprocess,

      emitCss: false,

      css: function (css) {
        // console.log(css.code); // the concatenated CSS
        // console.log(css.map); // a sourcemap
        // creates `main.css` and `main.css.map` — pass `false`
        // as the second argument if you don't want the sourcemap
        css.write('public/bundle.css');
      }
    }),
    terser(),
    html({
      template: '<html><head></head><body></body></html>',
      dest: 'public',
      filename: 'index.html',
      externals: [
        { type: 'css', file: 'bundle.css', pos: 'before' }
      ]
  })
  ]
}

