const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

CategoriesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

CategoriesSchema.set('toJSON', {
    virtuals: true,
});


module.exports = mongoose.model("Categories", CategoriesSchema);
