const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;
    if (password !== password2) {
      console.log(password, password2);
      return res.json("The Passwords Dont Match");
    }
    if (!username || !email || !password || !password2) {
      console.log("Please fill in all fields");
      return res.status(400).json("Please fill in all fields");
    }
    if (password !== password2) {
      console.log("The passwords don't match");
      return res.status(400).json("The passwords don't match");
    }
    if ((username, email, password, password2)) {
      if (password === password2) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    // console.log(req.body)
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    console.log(info);
    info.token = token;
    res.cookie("token", token).status(200).json(info);
    console.log(req.cookies.token);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", async (req, res) => {
  console.log("e reach here");
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//REFETCH USER
router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
