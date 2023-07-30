const Blog = require("../models/blog");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.blog_list = asyncHandler(async (req, res) => {
  const allBlogs = await Blog.find().sort({ createdAt: -1 });
  res.json(allBlogs);
});

exports.blog_details = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.json({ "blog id - detail ": id });
});

exports.create_blog = asyncHandler(async (req, res) => {
  res.json("create new blog");
});

exports.delete_blog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.json({ "blog id - delete ": id });
});

exports.update_blog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.json({ "blog id - update ": id });
});
