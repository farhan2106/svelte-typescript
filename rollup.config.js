import * as fs from 'fs';
import ts from 'typescript'
import svelte from 'rollup-plugin-svelte';
import typescript from 'rollup-plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import tsConfig from './tsconfig.json'
import { terser } from 'rollup-plugin-terser'
import html from 'rollup-plugin-bundle-html'
import packageJson from './package.json'

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
      },

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

