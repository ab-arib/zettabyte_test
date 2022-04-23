const Joi = require("joi");
const {
    validateRequest
} = require("./validate_request");

const createArticleValidation = Joi.object().keys({
    title: Joi.string().required(),
    summary: Joi.string().allow(null).required(),
    content: Joi.string().required(),
    author: Joi.string().required()
});

const editArticleValidation = Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string().required(),
    summary: Joi.string().allow(null).required(),
    content: Joi.string().required()
});

const createArticleSchema = (req, res, next) => {
    validateRequest(req, res, next, createArticleValidation);
}

const editArticleSchema = (req, res, next) => {
    validateRequest(req, res, next, editArticleValidation);
}

module.exports = {
    createArticleSchema,
    editArticleSchema
}