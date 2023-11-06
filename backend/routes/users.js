const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../utils/verifyToken')
const cloudinary = require("../utils/cloudinary");


//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    let {username, email, password, userImg} = req.body
    try{
        if(password){
            const salt=await bcrypt.genSalt(10)
            password=await bcrypt.hashSync(req.body.password,salt)
        }
        const newpas = password
        if(userImg){
            const uploadedResponse = await cloudinary.uploader.upload(userImg);
            
        if (uploadedResponse) {
          const user = {
            username,
            email,
            newpas,
            userImg: uploadedResponse.url,
          };
          const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set: user},{new:true})
          res.status(200).json(updatedUser)
        } 
    }}
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports=router