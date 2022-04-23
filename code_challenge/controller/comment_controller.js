const Comment = require("../models/Comment");
const Article = require("../models/Article");

const commentController = {};

commentController.create = async (req, res, next) => {
    try {
        console.log(`CREATE NEW COMMENT, REQUEST = ${JSON.stringify(req.body)}`);
        // validate if article exists
        const validateArticle = await Article.findById(req.body.article);
        if (!validateArticle) {
            console.log(`CREATE NEW COMMENT FAILED, ARTICLE NOT FOUND`);
            return res.status(404).json({
                status: "success",
                statusCode: 404,
                message: `Article by id = ${req.body.article} not found`,
                data: {}
            });
        }
        // create new comment
        const newComment = new Comment({
            article: req.body.article,
            content: req.body.content,
            from: req.body.from,
            created_date: Date.now(),
            updated_date: Date.now()
        });
        const comment = await newComment.save();
        // populate Article comment column
        await Article.findOneAndUpdate({id: req.body.article}, {
            $push: {
                comments: comment._id
            }
        });
        console.log(`CREATE NEW COMMENT, SUCCESS`);
        return res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Create new comment success",
            data: comment
        });
    } catch (e) {
        console.log(`INTERNAL SERVER ERROR, e = ${e}`);
        return res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error",
            error: e
        });
    }
}

commentController.getByArticleId = async (req, res, next) => {
    try {
        console.log(`GET ALL COMMENT BY ARTICLE ID, REQUEST = ${JSON.stringify(req.params.article_id, req.query)}`);
        // compose query params
        const sortBy = await req.query.sortBy ? req.query.sortBy : 'created_date';
        const dir = await req.query.direction ? req.query.direction : 'desc';
        const lmt = await req.query.limit ? req.query.limit : 10;
        const offset = await req.query.offset ? req.query.offset : 0;
        // get comment
        const comments = await Comment.find({
                article: req.params.article_id
            })
            .sort({
                [sortBy]: dir
            })
            .limit(Number(lmt))
            .skip(Number(offset))
        console.log(`GET ALL COMMENT BY ARTICLE ID, SUCCESS`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Get all comment by article id = ${req.params.article_id} success`,
            data: comments
        });
    } catch (e) {
        console.log(`INTERNAL SERVER ERROR, e = ${e}`);
        return res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error",
            error: e
        });
    }
}

commentController.edit = async (req, res, next) => {
    try {
        console.log(`EDIT COMMENT, REQUEST = ${JSON.stringify(req.body)}`);
        const editComment = {
            content: req.body.content,
            updated_date: Date.now()
        }
        await Comment.findByIdAndUpdate(req.body.id, editComment);
        const updatedComment = await Comment.findById(req.body.id);
        console.log(`EDIT COMMENT, SUCCESS`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Update comment success",
            data: updatedComment
        });
    } catch (e) {
        console.log(`INTERNAL SERVER ERROR, e = ${e}`);
        return res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error",
            error: e
        });
    }
}

commentController.delete = async (req, res, next) => {
    try {
        console.log(`DELETE COMMENT, REQUEST = ${req.params.id}`);
        await Comment.findByIdAndDelete(req.params.id);
        console.log(`DELETE COMMENT, SUCCESS`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Delete comment by id = ${req.params.id} success`,
            data: {}
        });
    } catch (e) {
        console.log(`INTERNAL SERVER ERROR, e = ${e}`);
        return res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error",
            error: e
        });
    }
}

module.exports = commentController;