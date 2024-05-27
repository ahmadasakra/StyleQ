const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwtaccess = require("../middleware/authaccess");
const router = express.Router();
const createOtp = require('../middleware/generateOTP');
const { sendOTP } = require('../middleware/mail');
const cache = require('../cache/cache');

// Signup route
router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("phone").isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: -1 });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ status: -1 });
      }

      const hash = await bcrypt.hash(req.body.password, 10);
      user = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: hash,
        phone: req.body.phone,
      });

      await user.save();
      const data = { id: user._id };
      const authtoken = jwt.sign(data, process.env.JWT_TOKEN);
      res.status(200).json({ status: 0, authtoken });
    } catch (error) {
      res.status(500).json({ status: -2 });
    }
  }
);

// Send OTP route
router.post('/sendOtp', jwtaccess, async (req, res) => {
  try {
    const user = await User.findById(req.userid);
    if (!user) {
      return res.status(400).json({ status: -1 });
    }
    const key = `${user.email}_OTP`;
    const OTP = createOtp();
    cache.set(key, OTP, 420);
    await sendOTP(user.email, OTP);
    res.status(200).json({ status: 0 });
  } catch (error) {
    console.error("Error in sendOtp:", error);
    res.status(500).json({ status: -2, error: error.message });
  }
});

// Verify OTP route
router.post('/verify', jwtaccess, async (req, res) => {
  try {
    const user = await User.findById(req.userid);
    if (!user) {
      return res.status(400).json({ status: -1 });
    }
    const key = `${user.email}_OTP`;
    if (cache.has(key)) {
      const OTP = cache.get(key);
      if (OTP === req.body.otp) {
        await User.findByIdAndUpdate(req.userid, { isEmail: true });
        res.status(200).json({ status: 0, message: 'Token abgeglichen' });
      } else {
        res.status(400).json({ status: -1, message: 'Token stimmt nicht überein' });
      }
    } else {
      res.status(400).json({ status: -1, message: 'Token stimmt nicht überein' });
    }
  } catch (error) {
    res.status(500).json({ status: -2, error });
  }
});

// Login route
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: -1 });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ status: -1 });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ status: -1 });
      }

      const data = { id: user._id };
      const authtoken = jwt.sign(data, process.env.JWT_TOKEN);
      res.status(200).json({ status: 0, authtoken });
    } catch (error) {
      res.status(500).json({ status: -2 });
    }
  }
);

// Access route
router.post('/access', jwtaccess, async (req, res) => {
  try {
    const user = await User.findById(req.userid);
    if (!user) {
      return res.status(400).json({ status: -1 });
    }
    const data = {
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      isEmail: user.isEmail,
    };
    res.status(200).json({ status: 0, data });
  } catch (error) {
    res.status(500).json({ status: -2 });
  }
});

// Update route
router.post('/update', [body("phone").isLength({ min: 10 })], jwtaccess, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: -1 });
    }
    await User.findByIdAndUpdate(req.userid, {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    });
    res.json({ status: 0 });
  } catch (error) {
    res.json({ status: -2 });
  }
});

module.exports = router;
