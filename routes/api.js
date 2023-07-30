const express = require("express");
const router = express.Router();
const cors = require("cors");
const BlogController = require("../controllers/BlogController");
const CommentController = require("../controllers/CommentController");

/* GET home page. */
router.get("/", cors(), function (req, res, next) {
  res.json({ text: "lol" });
});
router.get("/blogs", BlogController.blog_list);
router.get("/blogs/:id", BlogController.blog_details);
router.delete("/blogs/:id", BlogController.delete_blog);
router.post("/blogs", BlogController.create_blog);
router.put("/blogs/:id", BlogController.update_blog);

module.exports = router;
