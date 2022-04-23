const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: [{
        // define one-to-many schema
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    created_date: {
        type: Date
    },
    updated_date: {
        type: Date
    }
});

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;