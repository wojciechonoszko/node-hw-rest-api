const Joi = require('joi');

// POST

const schemaCreateContact = Joi.object({
    username: Joi.string()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {allow: ['com', 'net', 'ua', 'pl']},
        })
        .required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10, 13}$')).required(),
});

// PUT
const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'ua']},
        })
        .optional(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,13}$')).optional(),
}).min(1);

module.exports.validateCreateContact = (req, _, next) => {
    return Joi.validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _, next) => {
    return Joi.validate(schemaUpdateContact, req.body, next);
};