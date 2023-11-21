const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
},{timestamps:true})

CommentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

CommentSchema.set('toJSON', {
    virtuals: true,
});

module.exports=mongoose.model("Comment",CommentSchema)