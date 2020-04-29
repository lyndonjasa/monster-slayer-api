const mongoose = require("mongoose");

const Enemy = mongoose.model("Enemy", {
  name: String,
  level: Number,
  image: String,
  encRate: Number,
  exp: Number,
  stats: {
    health: Number,
    mana: Number,
    off: Number,
    def: Number,
    agi: Number,
    int: Number,
    luk: Number
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "EnemySkill"
  }],
  drops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }],
  boss: Boolean
});

module.exports = Enemy;