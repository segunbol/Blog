const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const categoriesRoute = require("./routes/categories");
const { fileURLToPath } = require("url");
const uploadRouter = require("./routes/uploadRoutes");
const fileUpload = require('express-fileupload');
const Post = require("./models/Post");

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//middlewares
dotenv.config();
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
app.use("/publicfiles/uploads", express.static(__dirname + "./publicfiles/uploads"));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }))

const api = process.env.API_URL;

app.get(`/`, (req, res) => {
  res.send(`SHOBLOYOKE THE BLOG`);
});
app.get(`${api}/search`, async (req, res) => {
  const PAGE_SIZE = 3;
  console.log("e reach here")
    const { query } = req;
    
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const categories = query.categories || '';
    const searchQuery = query.query || '';
    console.log(query.categories)
    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            title: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = categories && categories !== 'all' ? { categories : categories } : {};
   

    const posts = await Post.find({
      ...queryFilter,
      ...categoryFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    console.log(posts)
    const countPosts = await Post.countDocuments({
      ...queryFilter,
      ...categoryFilter,
    });
    res.send({
      posts,
      countPosts,
      page,
      pages: Math.ceil(countPosts / pageSize),
    });
})
app.use(`${api}/upload`, uploadRouter);
app.use(`${api}/auth`, authRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/posts`, postRoute);

app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/comments`, commentRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port " + process.env.PORT);
});
