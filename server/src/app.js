const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const api = require("./routes/api");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Logging requests with Morgan
app.use(morgan("combined"));

// JSON parsing middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
