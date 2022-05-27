const express = require("express");
const router = express.Router();
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.fields;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const hash = SHA256(password + user.salt).toString(encBase64);

      if (user.hash === hash) {
        res.json({
          message: "User logged in successully",
          token: user.token,
          username: user.username,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
