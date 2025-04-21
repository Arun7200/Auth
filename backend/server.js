const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ Mongo error", err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/password", require("./routes/passwordRoutes"));
app.use("/api/otp", require("./routes/otpRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
