const Joi = require('joi');

// POST

const schemaCreateContact = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {allow: ['com', 'net', 'ua', 'pl', 'org']},
        })
        .required(),
    phone: Joi.string().pattern(new RegExp('[0-9]')).required(),
    favorite: Joi.boolean().required()
});

// PUT
const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'ua', 'pl', 'org']},
        })
        .optional(),
    phone: Joi.string().pattern(new RegExp('[0-9]')).optional(),
    favorite: Joi.boolean().required()
}).min(1);
    

//PATCH
const schemaUpdateContactFavorite = Joi.object({
    favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
    try{
        await schema.validateAsync(body);
        next();
    } catch (error) {
        next({ status: 400, message: error.message });
    }
};

module.exports.validateCreateContact = (req, _, next) => {
    return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _, next) => {
    return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateUpdateContactFavorite = (req, _, next) => {
    return validate(schemaUpdateContactFavorite, req.body, next);
};