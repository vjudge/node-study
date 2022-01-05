const requireDir = require('require-dir')
const router = require('express').Router()
const ctrls = requireDir('../../ctrls')

router.get('/info', ctrls.user.fetchUser)
router.post('/info', ctrls.user.createUser)

module.exports = router