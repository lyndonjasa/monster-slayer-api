import express from "express";
import cors from "cors";
import "./mongo/mongoose-setup";

var app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Monster Slayer API");
});

app.listen(port, () => {
  console.log("server listening to port: " + port);
});