const express = require("express");
const router = express.Router();
const articleController = require("../controller/article_controller");
const {
    createArticleSchema,
    editArticleSchema
} = require("../validations/article_validation");

router.post("/create", createArticleSchema, articleController.create);
router.get("/get_all", articleController.getAll);
router.get("/get_by_id/:id", articleController.getById);
router.patch("/edit", editArticleSchema, articleController.edit);
router.delete("/delete/:id", articleController.delete);

module.exports = router;