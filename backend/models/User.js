const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 255,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user"
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    verified: {
      type: Boolean, 
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model("User", UserSchema);
