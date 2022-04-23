module.exports = {
    validateRequest: (req, res, next, schema) => {
        const options = {
            abortEarly: false, // include all errors
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                status: "failed",
                statusCode: 400,
                message: `Validation error: ${error.details.map(x => x.message).join(', ')}`,
                data: {}
            });
        } else {
            req.body = value;
            next();
        }
    }
}