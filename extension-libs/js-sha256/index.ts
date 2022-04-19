import fs from 'fs'
import { ReadStream } from 'fs'
import crypto from 'crypto'
import { sha256 } from 'js-sha256'
import _ from 'lodash'
import DEBUG from 'debug'
import child_process from 'child_process'
const debug = DEBUG('index')

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
getJsHash(file);

// 分片哈希
(async function main () {
  await genHash()
})()

async function genHash () {
  const read: ReadStream = fs.createReadStream(localPath)
  await genSliceHashs(read)

  // 进程处理
  const checkLegalProcess = child_process.fork(__dirname + '/slice-process.ts')
  checkLegalProcess.send(localPath)
  return new Promise((resolve, reject) => {
    checkLegalProcess.on('message', (message: any) => {
      // console.log('message: ', message)
      resolve(message)
    })
  })

}

function genSliceHashs (read: ReadStream): Promise<string[]> {
  const start = performance.now()
  const sliceHashSize = 50 * 1024 * 1024
  const sliceHashs: string[] = []
  let fileSize = 0
  let size = 0
  let hash = crypto.createHash('sha1')
  return new Promise((resolve) => {
    read.on('data', (data: Buffer) => {
      fileSize += data.byteLength // 记录最终文件大小
      if (size + data.byteLength < sliceHashSize) {
        hash.update(data)
        size += data.byteLength
      } else {
        const subSize = sliceHashSize - size
        hash.update(data.slice(0, subSize))
        sliceHashs.push(hash.digest('hex'))
        hash = crypto.createHash('sha1')
        size = data.byteLength - subSize
        if (size > 0) {
          hash.update(data.slice(subSize))
        }
      }
    })
    read.on('end', () => {
      if (size !== 0) {
        sliceHashs.push(hash.digest('hex'))
      }
      const resName: string = getCpHash(Buffer.from(sliceHashs.join('_'))) + '_' + fileSize
      sliceHashs.unshift(resName)
      const end = performance.now()
      console.log(`genSliceHashs: ${_.floor(end - start, 2)}ms`)
      resolve(sliceHashs)
    })
  })
}

// crypto
function getCpHash (data: Buffer) {
  const cpStart = performance.now()
  const hash = crypto.createHash('sha256')
  hash.update(data)
  const cpRet = hash.digest('hex')
  const cpEnd = performance.now()
  console.log(`crypto[${_.floor(data.byteLength / (1024 * 1024), 2)}M]: ${_.floor(cpEnd - cpStart, 2)}ms`)
}

// js-sha256
function getJsHash (data: Buffer) {
  const jsStart = performance.now()
  const jsRet = sha256(data)
  const jsEnd = performance.now()
  console.log(`js-sha256[${_.floor(data.byteLength / (1024 * 1024), 2)}M]: ${_.floor(jsEnd - jsStart, 2)}ms`)
}










