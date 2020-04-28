const express = require("express");
const cors = require("cors");
require("./mongo/mongoose-setup");

const config = require("./shared/config");

var app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes/all-routes");
routes.forEach(route => {
  app.use(route);
});

app.get("/", (req, res) => {
  res.send("Hello Monster Slayer API " + config.environment);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server listening to port: " + port);
});