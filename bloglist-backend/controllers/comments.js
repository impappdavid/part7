const commentsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { userExtractor } = require("../utils/middleware");


commentsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("comments");
  if (blog) {
    response.json(blog.comments);
  } else {
    response.status(404).json({ error: "blog not found" });
  }
});

commentsRouter.post("/:id/comments", userExtractor, async (request, response) => {
  const { comment } = request.body;
  const user = request.user; 

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  const newComment = new Comment({
    comment: comment,
    blog: blog._id,
  });

  const savedComment = await newComment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;