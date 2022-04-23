const Article = require("../models/Article");

const articleController = {};

articleController.create = async (req, res, next) => {
    try {
        console.log(`CREATE NEW ARTICLE, REQUEST = ${JSON.stringify(req.body)}`);
        // validate if title already exists
        const validateTitle = await Article.findOne({
            title: req.body.title
        });
        if (validateTitle) {
            console.log(`CREATE NEW ARTICLE FAILED, TITLE ALREADY EXISTS`);
            return res.status(400).json({
                status: "failed",
                statusCode: 400,
                message: "Article title already exists",
                data: {}
            });
        }
        // create new article
        const newArticle = new Article({
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content,
            author: req.body.author,
            created_date: Date.now(),
            updated_date: Date.now()
        });
        const article = await newArticle.save();
        console.log(`CREATE NEW ARTICLE, SUCCESS`);
        return res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Create new article success",
            data: article
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

articleController.getAll = async (req, res, next) => {
    try {
        console.log(`GET ALL ARTICLE, REQUEST = ${JSON.stringify(req.query)}`);
        // compose query params
        const sortBy = await req.query.sortBy ? req.query.sortBy : 'created_date';
        const dir = await req.query.direction ? req.query.direction : 'desc';
        const lmt = await req.query.limit ? req.query.limit : 10;
        const offset = await req.query.offset ? req.query.offset : 0;
        // get articles
        const articles = await Article.find()
            .sort({
                [sortBy]: dir
            })
            .limit(Number(lmt))
            .skip(Number(offset))
            .select("-content")
            .select("-comments");
        console.log(`GET ALL ARTICLE, SUCCESS`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Get all article success",
            data: articles
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

articleController.getById = async (req, res, next) => {
    try {
        console.log(`GET ARTICLE BY ID, REQUEST = ${req.params.id}`);
        // get articles
        const article = await Article.findById(req.params.id).populate({path: 'comments', options: {strictPopulate: false}});
        if (!article) {
            console.log(`GET ARTICLE BY ID FAILED, ARTICLE NOT FOUND`);
            return res.status(404).json({
                status: "success",
                statusCode: 404,
                message: `Article by id = ${req.params.id} not found`,
                data: {}
            });
        }
        console.log(`GET ARTICLE BY ID, SUCCESS`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Get article by id = ${req.params.id} success`,
            data: article
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

articleController.edit = async (req, res, next) => {
    try {
        console.log(`EDIT ARTICLE, REQUEST = ${JSON.stringify(req.body)}`);
        const editArticle = {
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content,
            updated_date: Date.now()
        }
        await Article.findByIdAndUpdate(req.body.id, editArticle);
        const updatedArticle = await Article.findById(req.body.id);
        console.log(`EDIT ARTICLE, SUCCESS`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Update article success",
            data: updatedArticle
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

articleController.delete = async (req, res, next) => {
    try {
        console.log(`DELETE ARTICLE, REQUEST = ${req.params.id}`);
        await Article.findByIdAndDelete(req.params.id);
        console.log(`DELETE ARTICLE, SUCCESS`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Delete article by id = ${req.params.id} success`,
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

module.exports = articleController;