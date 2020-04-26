const mongoose = require("mongoose");

const Character = mongoose.model("Character", {
  classType: Number,
  name: String,
  totalExp: Number,
  nextLevelExp: Number,
  level: Number,
  stats: {
    health: Number,
    mana: Number,
    off: Number,
    def: Number,
    spd: Number,
    int: Number,
    luk: Number
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill"
  }],
  equipment: {
    weapon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    },
    armor:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  }
});

module.exports = Character;