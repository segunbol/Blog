const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/Token");
const crypto = require("crypto");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;
    // const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const newUserName = await User.findOne({ username: username });
    const newUserEmail = await User.findOne({ email: email });
    if (newUserName || newUserEmail) {
      console.log("Username or Email Already Exist");
      return res.status(400).json("Username or Email Already Exist");
    }

    if (!username || !email || !password || !password2) {
      console.log("Please fill in all fields");
      return res.status(400).json("Please fill in all fields");
    }

    if (password !== password2) {
      console.log(password, password2);
      return res.status(400).json("The Passwords Dont Match");
    }

    if ((username, email, password, password2)) {
      if (password === password2) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        const userId = savedUser._id;
        const userEmail = savedUser.email;

        let token = await new Token({
          userId: userId,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const link = `https://shoboloyoke.onrender.com/api/v1/auth/verify/${userId}/${token.token}`;
        const subject = "Confirm Your Email";
        let result = username.charAt(0).toUpperCase() + username.slice(1);
        console.log(result);
        await sendEmail(userEmail, subject, link, result);

        res
          .status(200)
          .json(
            `Hey ${username}, an email has been sent to ${userEmail} for verification`
          );
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/verify/:id/:token", async (req, res) => {
  console.log("e reachest here");
  try {
    let user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log(token);
    if (!token) return res.status(400).send("Invalid link");
    console.log(user.verified);
    user.verified = true;
    await user.save();
    console.log(user);
    // const usel = await User.updateOne({ _id: user._id, verified: true });
    // console.log(usel.verified)

    await Token.findByIdAndRemove(token._id);
    // const toke = await Token.findOne({
    //   userId: user._id,
    //   token: req.params.token,
    // });

    // console.log(toke.token)
    // res.send("email verified sucessfully");
    res.redirect("/login?message=verification-successful");
  } catch (error) {
    res.status(400).send(`${error.message}`);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  // console.log(req.body);
  try {
    // console.log(req.body)
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found!");
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (token) {
        await Token.findByIdAndRemove(token._id);
        console.log("auth");
        tokened = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `https://shoboloyoke.onrender.com/api/v1/auth/verify/${user.id}/${token.token}`;
        const subject = "Confirm Your Email";
        await sendEmail(user.email, subject, url, user.username);
      }
      if (!token) {
        console.log("auth2");
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `https://shoboloyoke.onrender.com/api/v1/auth/verify/${user.id}/${token.token}`;
        const subject = "Confirm Your Email";
        await sendEmail(user.email, subject, url, user.username);
      }

      return res
        .status(400)
        .send(
          `Enter Password to resend verification`
        );
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
