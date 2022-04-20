import { parentPort } from 'worker_threads'
import DEBUG from 'debug'
const debug = DEBUG('worker')

parentPort.on('message', async (msg) => {
  debug('work.msg: ', msg)
  parentPort.postMessage(msg)
})
