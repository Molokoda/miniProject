const Joi = require('react-native-joi');

const createShopScheme = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    shopType: Joi.string().required(),
    latitude: Joi.string().regex(/^-{0,1}[0-9]{1,}.{0,1}[0-9]{0,}/).required().required(),
    longitude: Joi.string().regex(/^-{0,1}[0-9]{1,}.{0,1}[0-9]{0,}/).required().required(),
})

export default createShopScheme;