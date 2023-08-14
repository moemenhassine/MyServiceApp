const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/add", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const post = await Post.findById(req.params.id);
    if (post.email === email) {
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: req.params.id }, 
          { $set: req.body }, 
          { new: true } 
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id/:email", async (req, res) => {

  console.log("id is ",req.params.id)
  console.log("email is ",req.params.email)
  try {
   
    const { email } = req.params;
    const post = await Post.findById(req.params.id);
    if (post.email === email) {
      console.log(email)
      try {
        
        await post.deleteOne()
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  console.log(id);
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all posts of one user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ email: user.email });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const email = req.query.user;

  try {
    let posts;
    if (email) {
      posts = await Post.find({ email });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
