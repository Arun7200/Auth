const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// In-memory temporary store (email → { name, password, otp })
const tempUserStore = new Map();

exports.sendOtp = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already registered" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save user + otp to temp memory (plaintext password for now)
  tempUserStore.set(email, { name, password, otp });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Authly" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Authly Signup',
    html: `<h3>Your OTP is: <b>${otp}</b></h3><p>It is valid for 5 minutes.</p>`,
  });

  res.json({ msg: "OTP sent to your email" });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const tempUser = tempUserStore.get(email);

  if (!tempUser) return res.status(400).json({ msg: "OTP expired or email not found" });
  if (tempUser.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

  // 🔒 Hash the password before saving
  const hashedPassword = await bcrypt.hash(tempUser.password, 10);

  const newUser = new User({
    name: tempUser.name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  tempUserStore.delete(email);

  res.json({ msg: "Signup successful. You can now login." });
};
