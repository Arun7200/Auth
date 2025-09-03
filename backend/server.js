const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(cors());
app.use(express.json());

// Add a root route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CLIENT_URL + "/api/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  // Find or create user in your DB
  return done(null, profile);
}
));
// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
// filepath: c:\Users\arunk\OneDrive\Desktop\authly\backend\server.js

// Initialize passport
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error", err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/password", require("./routes/passwordRoutes"));
app.use("/api/otp", require("./routes/otpRoutes"));
app.use("/api/google", require("./routes/googleAuthRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));