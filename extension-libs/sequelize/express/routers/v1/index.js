const rootRouter = require('express').Router()

rootRouter.use('/user', require('./user'))

module.exports = function vRouter (app) {
    app.use('/api/v1', rootRouter)
}