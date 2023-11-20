const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
    isSuperAdmin: {
      type: Boolean,
    },
    isCreator: {
      type: Boolean,
    },
    userImg: {
      type: String,
    },
    // categoriesId:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Categories',
    //   required: true
    // },
    categories: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

PostSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

PostSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model("Post", PostSchema);
