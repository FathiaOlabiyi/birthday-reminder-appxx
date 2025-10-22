const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
      index: true
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function(next) {
  if(this.username) {
    this.username = this.username[0].toUpperCase() + this.username.slice(1)
  }
  next()
});

module.exports = mongoose.model("User", userSchema);