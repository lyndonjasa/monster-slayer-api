const mongoose = require("mongoose");

const EnemySkill = mongoose.model("EnemySkill", {
  name: String,
  type: String,
  damage: Number,
  target: String,
  cost: Number
}, "enemy-skills");

module.exports = EnemySkill;