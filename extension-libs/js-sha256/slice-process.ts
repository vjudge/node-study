import fs, { ReadStream } from 'fs'
import crypto from 'crypto'
import _ from 'lodash'
import request from 'request'
import DEBUG from 'debug'
const debug = DEBUG('app:module:callback:move-check-legal')

const downloadUrl = 'https://cofile13-1255382607.cos.ap-beijing.myqcloud.com/res-store-cache%2F1650015361815%2Fres-store%2F9161effba3532e5ba805a17e21f0211e6aa53f37003e3170735ce58bbfc09391_516590939?response-content-disposition=attachment&q-sign-algorithm=sha1&q-ak=AKIDd6LM9gy1pNgkZ8VdWAYieLn0xf7KI0Ti&q-sign-time=1650211200;1650340800&q-key-time=1650211200;1650340800&q-header-list=host&q-url-param-list=&q-signature=5da7bbebcc3be3a2d4f5901ae5b41e2c1d2ea64d'

process.on('message', async (localPath: string) => {
  debug('process.pid: ', process.pid)
  // const read: ReadStream = fs.createReadStream(localPath)
  const read = request(downloadUrl)
  const ret = await genHashs(read)
  process.send(ret)
})

function genHashs (read: any): Promise<string[]> {
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
      console.log(`sliceProcess: ${_.floor(end - start, 2)}ms`)
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
  return cpRet
}


