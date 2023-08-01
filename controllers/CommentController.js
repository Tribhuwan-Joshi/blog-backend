const Blog = require("../models/blog");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.delete_comment = asyncHandler(async (req, res) => {
  res.json({ "Delete comment with id -": req.params.id });
});
