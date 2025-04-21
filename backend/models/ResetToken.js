const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // token expires in 1 hour
  },
});

module.exports = mongoose.model("ResetToken", resetTokenSchema);
