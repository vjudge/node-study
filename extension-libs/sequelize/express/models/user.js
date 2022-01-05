const _ = require('lodash')
const sequelize = require('../../sequelize')

const debug = require('debug')('models:user')

module.exports = {
    fetchUser,
    createUser
}

async function fetchUser (userInfo) {
    let result = await sequelize.models.user.findOne({ where: userInfo });
    return result
}

async function createUser (userInfo) {
    let user = await sequelize.models.user.create(userInfo);
    let result = user.toJSON();
    console.log('createUser result', result)
    return result
}