const User = require("../models/User");
const ResetToken = require("../models/ResetToken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "Email not registered" });

  const token = crypto.randomBytes(32).toString("hex");
  await ResetToken.create({ email, token });

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Authly" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`,
  });

  res.json({ msg: "Reset link sent to your email" });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetToken = await ResetToken.findOne({ token });
  if (!resetToken) return res.status(400).json({ msg: "Invalid or expired token" });

  const hashed = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({ email: resetToken.email }, { password: hashed });
  await ResetToken.deleteOne({ token });

  res.json({ msg: "Password reset successful" });
};
