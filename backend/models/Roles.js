const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema(
  {
    role: {
        type: String,
      },
  },
  { timestamps: true }
);

RolesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

RolesSchema.set('toJSON', {
    virtuals: true,
});


module.exports = mongoose.model("Roles", RolesSchema);
