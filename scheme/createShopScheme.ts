const Joi = require('joi');

const createShopScheme = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    shopType: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    latitude: [
        Joi.string()
        .required(),
    ],

    longitude: [
        Joi.string()
        .required(),
    ],
})

export default createShopScheme;