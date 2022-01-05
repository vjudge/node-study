const _ = require('lodash')
const joi = require('./joi-model')
const user = require('../models/user')

const debug = require('debug')('ctrl:user');

exports.fetchUser = async function (req, res, next) {
    try {
        let result = await user.fetchUser();
        res.status(200).json({ code: 0, data: { msg: result } });
    } catch (err) {
        res.status(500).json({ msg: `服务异常` });
    }
}

exports.createUser = async function (req, res, next) {
    try {
        let user = _.pick(req.body, ['userName']);
        const { error } = joi.userModel.validate(user);
        if (error) {
            return res.status(400).json({ msg: '参数非法', error });
        }
        let result = await user.createUser(user);
        res.status(200).json({ code: 0, data: { msg: result }})
    } catch (err) {
        console.error('createUser err', err)
        res.status(500).json({ msg: '服务异常'})
    }
}