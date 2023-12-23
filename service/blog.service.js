const Blog = require("../models/Blog");

exports.createBlogService = async (data) => {
  const result = await Blog.create(data);
  return result;
};
exports.getAllBlogsService = async (query) => {
  const result = await Blog.find(query).populate("author", "fullName");
  return result;
};
exports.getSingleBlogService = async (blogId) => {
  console.log(blogId);
  const result = await Blog.findOne({ _id: blogId }).populate(
    "author",
    "fullName"
  );
  return result;
};
exports.getMyBlogsService = async (userId) => {
  const result = await Blog.find({ author: userId }).populate(
    "author",
    "fullName"
  );
  return result;
};
exports.editSingleBlogService = async (blogId, data) => {
  const result = await Blog.updateOne({ _id: blogId }, data);
  return result;
};
exports.deleteBlogService = async (blogId) => {
  const result = await Blog.deleteOne({ _id: blogId });
  return result;
};
