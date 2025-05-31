const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// const __dirname = path.resolve();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const categoriesRoute = require("./routes/categories");
// const { fileURLToPath } = require("url");
const uploadRouter = require("./routes/uploadRoutes");
const fileUpload = require("express-fileupload");
const searchRouter = require("./routes/search");

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

//middlewares
dotenv.config();
const backendRoot = __dirname;
const frontendDistPath = path.join(backendRoot, "..", "frontend", "dist");
app.use(express.static(frontendDistPath));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(
  "/publicfiles/uploads",
  express.static(__dirname + "./publicfiles/uploads")
);
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

const api = process.env.API_URL;

app.get(`/`, (req, res) => {
  res.send(`MY OXYGEN THE BLOG`);
});
app.use(`${api}/search`, searchRouter);
app.use(`${api}/upload`, uploadRouter);
app.use(`${api}/auth`, authRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/posts`, postRoute);

app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/comments`, commentRoute);

app.get("*", (req, res) => {
  
  const data = path.join(frontendDistPath, "index.html");
  console.log(data);
  res.sendFile(path.join(data));
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port " + process.env.PORT);
});
