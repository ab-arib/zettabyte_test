const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    article: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    created_date: {
        type: Date
    },
    updated_date: {
        type: Date
    }
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;