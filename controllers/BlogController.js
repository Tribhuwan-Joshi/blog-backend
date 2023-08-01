const Blog = require("../models/blog");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.blog_list = asyncHandler(async (req, res) => {
  const allBlogs = await Blog.find().sort({ createdAt: -1 });
  res.json(allBlogs);
});

exports.blog_details = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // Assuming you have a 'Comment' model to fetch comments associated with the blog
  const blog = await Blog.findById(id);
  const comments = await Comment.find({ blogId: id });

  if (!blog) {
    // If the blog with the specified id is not found, send a 404 Not Found response.
    return res.status(404).json({ error: "Blog not found" });
  }

  // If the blog is found, send it along with the comments in the response.
  res.json({ blog, comments });
});

exports.create_blog = [
  // check for tags
  (req, res, next) => {
    if (!(req.body.tags instanceof Array)) {
      if (typeof req.body.tags === "undefined") req.body.tags = [];
      else req.body.tags = new Array(req.body.tags);
    }
    next();
  },

  body("title", "Title must not be empty.").trim().isLength({ min: 1 }),
  body("content", "Content must not be empty.").trim().isLength({ min: 1 }),
  body("tags*").escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    // create blog
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    });
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    await blog.save();
    res.send("create new blog");
  }),
];

exports.delete_blog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Blog.findByIdAndRemove(id);
  res.status(204).send("deleted");
});

exports.update_blog = [
  (req, res, next) => {
    if (!(req.body.tags instanceof Array)) {
      if (typeof req.body.tags === "undefined") req.body.tags = [];
      else req.body.tags = new Array(req.body.tags);
    }
    next();
  },
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }),
  body("content", "Content must not be empty.").trim().isLength({ min: 1 }),
  body("tags*").escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    // create blog
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const id = req.params.id;
    await Blog.findByIdAndUpdate(id, blog, {});
    res.json({ "blog id - update ": id });
  }),
];
