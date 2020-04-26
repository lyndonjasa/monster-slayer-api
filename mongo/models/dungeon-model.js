const mongoose = require("mongoose");

const Dungeon = mongoose.model("Dungeon", {
  name: String,
  image: String,
  recommendedLevel: Number,
  enemies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enemy"
  }],
  bossReq: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enemy"
  }
});

module.exports = Dungeon;