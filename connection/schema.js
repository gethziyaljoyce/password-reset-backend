const joi = require("joi");

//schema validation
const schema = {
    registerSchema: joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(10).required(),
    }),
    loginSchema: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).max(10).required(),
    }),
    forgotPasswordSchema: joi.object({
        email: joi.string().email().required(),
    }),
};
module.exports = schema;