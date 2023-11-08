const express=require('express')
const router=express.Router()
const Categories=require('../models/Categories')
const bcrypt=require('bcrypt')
const verifyToken = require('../utils/verifyToken')

//CREATE
router.post("/",async (req,res)=>{
    // console.log(req.body)
    try{
        const newCategory=new Categories(req.body)
        const savedCategory=await newCategory.save()
        res.status(200).json(savedCategory)
    }
    catch(err){
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",async (req,res)=>{
    try{
       
        const updatedCategory=await Categories.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedCategory)

    }
    catch(err){
        res.status(500).json(err)
    }
})


// GET ALL CATEGORIES
router.get('/', async (req, res) => {
    const categories = await Categories.find();
    res.send(categories);
  });


//GET POST COMMENTS
router.get("/:id",async (req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Categories.findByIdAndDelete(req.params.id)
        
        res.status(200).json("Category has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports=router