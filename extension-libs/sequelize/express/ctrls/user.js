const _ = require('lodash')
const user = require('../models/user')

const debug = require('debug')('ctrl:monitor')

exports.fetchUser = async function (req, res, next) {
    try {
        let result = await user.fetchUser()
        res.status(200).json({ code: 0, data: { msg: result } })
    } catch (err) {
        res.status(500).json({ msg: `服务异常` })
    }
}