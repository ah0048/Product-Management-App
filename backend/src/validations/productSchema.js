const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().positive().precision(2).required(),
    imageUrl: Joi.string().uri(),
})
module.exports = productSchema
