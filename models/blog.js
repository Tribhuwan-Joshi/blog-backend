const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: { type: String },
});

BlogSchema.virtual("createDate").get(function () {
  const formattedDate = this.createdAt.toLocaleString("en-GB", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  return formattedDate;
});

module.exports = mongoose.model("Blog", BlogSchema);
