import child_process from 'child_process'

const childInstance = child_process.fork(__dirname + '/child-process.js')
const params = {} // 传递参数
childInstance.send(params)
childInstance.on('message', (message) => {
  // 处理子进程处理结果
  childInstance.kill()
})

// child-process.js
process.on('message', async (params) => {
  // 子进程处理
  const ret = await customProcess(params)
  process.send(ret)
})

async function customProcess (params) {
  // ...
}
