const express = require("express");
const router = express.Router();
const articleRoute = require("./article_router");
const commentRoute = require("./comment_router");

router.use("/article", articleRoute);
router.use("/comment", commentRoute);

module.exports = router;