const fs = require('fs')
const crypto = require('crypto')
const { sha256 } = require('js-sha256')
const _ = require('lodash')

// 本地地址
// const localPath = '/Users/vjudge/Downloads/test/download-flowchart.jpeg' // 76k
// const localPath = '/Users/vjudge/Downloads/test/11111111.mp3' // 4.8M
// const localPath = '/Users/vjudge/Downloads/test/001-Go/08-map.f4v' // 10.6M
// const localPath = '/Users/vjudge/Downloads/Software/Lemon_5.0.2.3.dmg' // 62M
// const localPath = '/Users/vjudge/Downloads/test/1.6.042-lecture-01.mp4' // 97.3M
const localPath = '/Users/vjudge/Downloads/Software/idea/RubyMine-2021.2.2.dmg' // 516M
// const localPath = '/Users/vjudge/Downloads/Software/idea/RubyMine-2021.2.2.dmg' // 516M
// const localPath = '/Users/vjudge/Downloads/Software/ubuntu-20.04.3-live-server-amd64.iso' // 1.2G

const fileSize = fs.statSync(localPath).size
console.log('文件大小(M): ', _.floor(fileSize / (1024 * 1024), 2))
const file = fs.readFileSync(localPath)

getCpHash(file)
getJsHash(file)

genSliceHash(localPath).then((data) => {
  console.log(data)
})

// slice
function genSliceHash (localPath) {
  const read = fs.createReadStream(localPath)
  const sliceHashSize = 50 * 1024 * 1024
  const sliceHashs = []
  let size = 0
  const start = performance.now()
  let hash = crypto.createHash('sha256')
  read.on('data', (data) => {
    if (size + data.byteLength < sliceHashSize) {
      hash.update(data)
      size += data.byteLength
    } else {
      const subSize = sliceHashSize - size
      hash.update(data.slice(0, subSize))
      sliceHashs.push(hash.digest('hex'))
      hash = crypto.createHash('sha256')
      size = data.byteLength - subSize
      if (size > 0) {
        hash.update(data.slice(subSize))
      }
    }
  })
  return new Promise(resolve => {
    read.on('end', () => {
      if (size !== 0) {
        sliceHashs.push(hash.digest('hex'))
      }
      const end = performance.now()
      console.log(`_genHashs: ${_.floor(end - start, 2)}ms`)
      resolve(true)
    })
  })
}





// crypto
function getCpHash (data) {
  const cpStart = performance.now()
  const hash = crypto.createHash('sha256')
  hash.update(file)
  const cpRet = hash.digest('hex')
  const cpEnd = performance.now()
  console.log(`crypto[${_.floor(data.byteLength / (1024 * 1024), 2)}M]: ${_.floor(cpEnd - cpStart, 2)}ms`)
}

// js-sha256
function getJsHash (data) {
  const jsStart = performance.now()
  const jsRet = sha256(file)
  const jsEnd = performance.now()
  console.log(`js-sha256[${_.floor(data.byteLength / (1024 * 1024), 2)}M]: ${_.floor(jsEnd - jsStart, 2)}ms`)
}


// // 地址 97M
// "res-store-tmp/1649939333221/__delimiter__/res-store/6d2d01f020262c92e94c9575b76c2a431b3e9cf6a5f1597c756c40ce49d0cd02_97300847"
// // 分片哈希 97M
// "res-store-tmp/1650002201135/__delimiter__/res-store/78416edb39a1483cf36a7ce1d026e4d6dd9931be98b3a3fb23b4ffe2ddde124b_97300847"
//
//
// "res-store-tmp/1650008910200/__delimiter__/res-store/6df4c28c518baff9128d748fc4bc2638a3aa466df51562ec0d9d9b1582240254_516590939"
// // 分片哈希 500M
// "res-store-tmp/1650008225741/__delimiter__/res-store/9678b6ef95200f1b610bc3d705a94dedcb9f1c40595a9b2c01b40f44fe2dd792_516590939"


