const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment_controller");
const {
    createCommentSchema,
    editCommentSchema
} = require("../validations/comment_validation");

router.post("/create", createCommentSchema, commentController.create);
router.get("/get_all_by_article_id/:article_id", commentController.getByArticleId);
router.patch("/edit", editCommentSchema, commentController.edit);
router.delete("/delete/:id", commentController.delete);

module.exports = router;