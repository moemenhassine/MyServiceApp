const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      
    },
    
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
