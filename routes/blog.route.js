const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getSingleBlog,
} = require("../controller/blog.controller");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.route("/").get(getAllBlogs).post(verifyToken, createBlog);
router.route("/:blogId").get(getSingleBlog);

module.exports = router;
