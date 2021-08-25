console.log('start require')
const lib = require('./lib')
console.log('lib: ', lib)
lib.addpkg = 'add pkg'
console.log('end require')

// webpack --devtool none --mode development --target node index.js



