const Joi = require('joi')

// user
exports.userModel = Joi.object({
    userName: Joi.string().min(3).max(50).required()
})