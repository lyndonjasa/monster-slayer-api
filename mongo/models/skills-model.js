const mongoose = require("mongoose");

const Skill = mongoose.model("Skill", {
  classId: Number,
  name: String,
  damage: Number,
  cost: Number,
  type: String,
  target: String,
  lvlReq: Number
});

module.exports = Skill;