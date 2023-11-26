const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../utils/verifyToken");
const cloudinary = require("../utils/cloudinary");
// const sharp = require('sharp');

//CREATE
// router.post("/create",verifyToken,async (req,res)=>{
//     try{
//         // console.log(req.body)
//         const newPost=new Post(req.body)
//         console.log(req.body)
//         const savedPost=await newPost.save()

//         res.status(200).json(savedPost)
//     }
//     catch(err){

//         res.status(500).json(err)
//     }

// })

router.post("/create", verifyToken, async (req, res) => {
  const { username, title, desc, categories, userId, photo, userImg } =
    req.body;
  console.log("e dey her");
  try {
    if (photo) {
      const uploadedResponse = await cloudinary.uploader.upload(photo);
      console.log("e enter here")
      if (uploadedResponse) {
        const post = new Post({
          username,
          categories,
          userId,
          userImg,
          desc,
          title,
          photo: uploadedResponse.url,
        });

        const savedPost = await post.save();
        res.status(200).send(savedPost);
      }
    } else {
      const post = new Post({
        username,
        categories,
        userId,
        desc,
        title,
        photo,
      });

      const savedPost = await post.save();
      res.status(200).send(savedPost);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST DETAILS
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS
router.get("/", async (req, res) => {
  console.log("here");
  const query = req.query;

  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const posts = await Post.find(query.search ? searchFilter : null);
    // console.log(posts)
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET USER POSTS
router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
    // console.log(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:category", async (req, res) => {
  const category = req.params.category;
  console.log("As e dey go")
  try {
    const posts = await Post.find({ category }); // Find products with matching category
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


const PAGE_SIZE = 3;

router.get('/search', async (req, res) => {
    console.log("e reach here")
    const { query } = req;
    
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const categories = query.category || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = categories && categories !== 'all' ? { categories : categories } : {};
   

    const posts = await Post.find({
      ...queryFilter,
      ...categoryFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    console.log(posts)
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
  })
;

module.exports = router;
