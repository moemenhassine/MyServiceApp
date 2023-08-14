const express = require("express");
const app = express();
const User = require("./models/User");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");

app.use(express.json());

const fileStorageEngine = multer.diskStorage({
  destination:(req , file , cb)=>{
    cb(null, './images' );
    
  },
  filename:(req , file , cb)=>{
cb(null, Date.now + "---" + file.originalname )
}

})

const upload =  multer({storage : fileStorageEngine})
app.post("/api/single",upload.single('image') ,(req, res) => {
  console.log(req.file)
  res.send("Single file upload success")
  res.send(req.file)
}
)
/* app.post("/api/multiple",upload.array('images',3) ,(req, res) => {
  console.log(req.files)
  res.send("multiple file upload success")
}
) */

const cors = require("cors");
//à changer selon votre adresse ip
const HOST = "192.168.1.15";
// const HOST = "192.168.130.135";
app.use(express.json());

/* app.use(cors({
  origin:["http://localhost:3000"],
  methods : "GET,POST,PUT,DELETE"
 })) */

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(5000, HOST, () => {
  console.log("Backend is running.");
});
