module.exports = function (playAct) {
  console.log('你出了: ', playAct)

  let sysNum = Math.random() * 3
  let sysAct = 'rock'
  if (sysNum >= 2) {
      sysAct = 'scissor'
  } else if (sysNum >= 1) {
      sysAct = 'paper'
  }
  console.log('电脑出了: ', sysAct)

  if (playAct == sysAct) {
      return 0
  } else if ((playAct == 'rock' && sysAct == 'scissor') || (playAct == 'scissor' && sysAct == 'paper') || (playAct == 'paper' && sysAct == 'rock')) {
      return -1
  }
  return 1
}