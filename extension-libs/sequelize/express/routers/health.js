const _ = require('lodash')
const router = require('express').Router()

router.get('/health', (req, res) => {
    return res.status(200).json({ code: 0, msg: 'OK' })
})

module.exports = router