const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../utils/verifyToken')
const cloudinary = require("../utils/cloudinary");

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
    const { username, title, desc, categories, userId, photo } = req.body;
    console.log("e dey her")
    try {
      if (photo) {
        const uploadedResponse = await cloudinary.uploader.upload(photo);
  
        if (uploadedResponse) {
          const post = new Post({
            username,
            categories,
            userId,
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
            photo
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
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET POSTS
router.get("/",async (req,res)=>{
    console.log("here")
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        // console.log(posts)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET USER POSTS
router.get("/user/:userId", verifyToken,async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
        console.log(req.params.userId)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports=router