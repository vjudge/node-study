const fs = require('fs')
const crypto = require('crypto')

// // 哈希流
// const hash1 = crypto.createHash('sha256')
// hash1.on('readable', () => {
//   const data = hash1.read()
//   if (data) {
//     console.log('哈希流: ', data.toString('hex'))
//   }
// })
// hash1.write('xxxxxx')
// hash1.end()

// // 管道流
// const hash2 = crypto.createHash('sha256')
// const input = fs.createReadStream('../.eslintrc')
// const stdout = null
// input.pipe(hash2).setEncoding('hex').pipe(stdout)
// console.log('stdout: ', stdout)

const hash3 = crypto.createHash('sha256')
hash3.update('123')
console.log(hash3.digest('hex'))
hash3.update('456')
console.log(hash3.digest('hex'))
hash3.update('123')
console.log(hash3.digest('hex'))

