const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
// const enforce = require('express-sslify');

const app = express();
// Load Config
dotenv.config({ path: "./config/.env" });

// Connect DB
connectDB();

const auth = require("./routes/auth");
const user = require("./routes/user");
const profile = require("./routes/profile");
const admin = require("./routes/admin");
const Subscription = require("./routes/subscription");
const forgotpassword = require("./routes/forgotpassword");

// Parse Middleware
app.use(cors());
app.use(express.json());
// app.use(enforce.HTTPS({ trustProtoHeader: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Register Routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/admin", admin);
app.use("/api/Subscription", Subscription);
app.use("/api/forgotpassword", forgotpassword);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Service Worker
// app.get('/service-worker.js', (req, res) => {
//   res.sendFile(path.solve(__dirname, 'client', 'build', 'service-worker.js'));
// });
