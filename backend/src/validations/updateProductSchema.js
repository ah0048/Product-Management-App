const Joi = require('joi');

const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    description: Joi.string().min(10).max(500),
    price: Joi.number().positive().precision(2),
    imageUrl: Joi.string().uri(),
})
module.exports = updateProductSchema
