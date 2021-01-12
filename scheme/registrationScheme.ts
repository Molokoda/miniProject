const Joi = require('joi');

const regSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(3)
        .max(15), 
    
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),
})
    .with('login', 'password')

export default regSchema;