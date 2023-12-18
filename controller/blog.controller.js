const {
  createBlogService,
  getAllBlogsService,
  getSingleBlogService,
} = require("../service/blog.service");

exports.createBlog = async (req, res) => {
  try {
    const data = req.body;
    const result = await createBlogService(data);
    res.status(200).json({
      status: "Success",
      message: "Successfully create a blog",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const result = await getAllBlogsService();
    res.status(200).json({
      status: "Success",
      message: "Successfully get all blogs",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
exports.getSingleBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const result = await getSingleBlogService(blogId);
    res.status(200).json({
      status: "Success",
      message: "Successfully get  blog",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
