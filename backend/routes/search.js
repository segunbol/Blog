const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const Post = require("../models/Post");
// const Comment = require("../models/Comment");
// const verifyToken = require("../utils/verifyToken");

router.get(`/`, async (req, res) => {
  const PAGE_SIZE = 10;
  console.log("e reach here");
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const categories = query.categories || "";
  const searchQuery = query.query || "";
  console.log(query.categories);
  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          title: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter =
    categories && categories !== "all" ? { categories: categories } : {};

  const posts = await Post.find({
    ...queryFilter,
    ...categoryFilter,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  // console.log(posts)
  const countPosts = await Post.countDocuments({
    ...queryFilter,
    ...categoryFilter,
  });
  res.send({
    posts,
    countPosts,
    page,
    pages: Math.ceil(countPosts / pageSize),
  });
});

module.exports = router;
