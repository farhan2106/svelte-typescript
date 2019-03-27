const fs = require('fs')
const ts = require('typescript')
const tsConfig = require('./../tsconfig.json')

module.exports = {
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