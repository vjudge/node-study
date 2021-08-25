console.log('hello commonjs')

exports.pkg = 'hello commonjs'

exports.sum = function (a, b) {
    return a + b
}

module.exports = function minus (a, b) {
    return a - b
}

setTimeout(() => {
    console.log('exports: ', exports)
}, 2000)