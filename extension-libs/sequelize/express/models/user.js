const _ = require('lodash')
const sequelize = require('../../sequelize')

const debug = require('debug')('models:user')

module.exports = {
    fetchUser,
    createUser
}

async function fetchUser () {
    let result = 'vjudge'
    return result
}

async function createUser (user) {
    let result = await sequelize.user.create(user);
    console.log('createUser result', result)
    return result
}