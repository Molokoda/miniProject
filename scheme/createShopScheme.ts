const Joi = require('react-native-joi');

const createShopScheme = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    shopType: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
})

export default createShopScheme;