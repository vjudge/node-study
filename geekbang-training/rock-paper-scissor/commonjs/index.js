const game = require('./lib')

let playAct = process.argv[2]

let cnt = 0
process.stdin.on('data', arg => {
    const playAct = arg.toString().trim()
    const result = game(playAct)
    
    if (result == -1) {
        cnt ++
    }
    
    if (cnt == 3) {
        console.log('你太厉害了，我不玩了')
        process.exit(0)
    }
})