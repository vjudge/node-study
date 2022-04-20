import { Worker } from 'worker_threads'
import DEBUG from 'debug'
const debug = DEBUG('app:task:CheckLegalTask')

import { ParentMessage, WorkerInstance, WorkMessage } from './task.interface'


export class CheckLegalTask {
  private readonly lens: number = 2
  private workers: WorkerInstance[] = []

  constructor () {
    for (let index = 0; index < this.lens; index ++) {
      const worker = new Worker(__dirname + '/worker.js', {
        workerData: {
          aliasModule: __dirname + '/worker.ts'
        }
      })
      worker.on('message', (msg: ParentMessage) => {
        debug('worker.message: ', msg)
        this.workers[msg.index].status = true // 释放进程
      })
      worker.on('exit', (code) => {
        debug('worker.exit: ', code)
      })
      worker.on('error', (err: Error) => {
        console.error('work.Error: ', err)
      })
      this.workers.push({
        worker,
        index,
        status: true,
      })
    }
  }

  async start () {
    debug('--- start task ---')
    // while (true) {
    for (let index = 0; index < this.lens; index ++) {
      if (this.workers[index].status) { // 当前线程空闲
        this.workers[index].status = false
        const msg = <WorkMessage>{ index }
        this.workers[index].worker.postMessage(msg)
      }
    }
    debug('--- sleep ---')
    // await sleep(1 * 60 * 1000)
    // }
  }
}

test()
async function test () {
  const clt = new CheckLegalTask()
  await clt.start()
}
