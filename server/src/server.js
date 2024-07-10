const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000;

// For testing only. These credentials will be changed and hidden.
const MONGO_URL =
  "mongodb+srv://andy:tmWCeMJ4CK4iGWos@nasa-cluster.ilbgsxp.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASA-Cluster";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

startServer();
