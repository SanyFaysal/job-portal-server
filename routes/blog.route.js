const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  getMyBlogs,
  editSingleBlog,
  deleteBlog,
} = require("../controller/blog.controller");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(getAllBlogs).post(verifyToken, createBlog);

router.route("/get/:userId").get(getMyBlogs);
router
  .route("/:blogId")
  .get(getSingleBlog)
  .patch(editSingleBlog)
  .delete(deleteBlog);

module.exports = router;
