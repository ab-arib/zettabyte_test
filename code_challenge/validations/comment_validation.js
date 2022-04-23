const Joi = require("joi");
const {
    validateRequest
} = require("./validate_request");

const createCommentValidation = Joi.object().keys({
    article: Joi.string().required(),
    content: Joi.string().required(),
    from: Joi.string().required()
});

const editCommentValidation = Joi.object().keys({
    id: Joi.string().required(),
    content: Joi.string().required()
});

const createCommentSchema = (req, res, next) => {
    validateRequest(req, res, next, createCommentValidation);
}

const editCommentSchema = (req, res, next) => {
    validateRequest(req, res, next, editCommentValidation);
}

module.exports = {
    createCommentSchema,
    editCommentSchema
}