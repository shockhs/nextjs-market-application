const Joi = require('@hapi/joi')

// Register Validation
const addProductValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6).max(255),
        category: Joi.string().required().valid('keyboards', 'monitors', 'servers', 'components'),
        price: Joi.number().required().min(1000).max(1000000),
        imageUrl: Joi.string().uri().required().max(255)
    })
    return schema.validate(body);
}

const editProductValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6).max(255),
        category: Joi.string().required().valid('keyboards', 'monitors', 'servers', 'components'),
        price: Joi.number().required().min(1000).max(1000000),
        imageUrl: Joi.string().uri().required().max(255)
    })
    return schema.validate(body);
}

const categoryProductValidation = (body) => {
    const schema = Joi.object({
        category: Joi.string().required().valid('keyboards', 'monitors', 'servers', 'components')
    })
    return schema.validate(body);
}

module.exports.addProductValidation = addProductValidation;
module.exports.editProductValidation = editProductValidation;
module.exports.categoryProductValidation = categoryProductValidation;