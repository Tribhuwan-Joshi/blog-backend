const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: "Blog" },
});

module.exports = mongoose.model("Comment", CommentSchema);
