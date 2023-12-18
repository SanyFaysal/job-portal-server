const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors(["https://job-portal-eosin.vercel.app"]));

// import routes
const jobRoute = require("./routes/job.route");
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");

// routes
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1", jobRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

module.exports = app;
