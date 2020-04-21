const mongoose = require("mongoose");

const Character = mongoose.model("Character", {
  classType: Number,
  name: String,
  stats: {
    health: Number,
    mana: Number,
    off: Number,
    def: Number,
    spd: Number,
    int: Number,
    luk: Number
  },
  skills: [mongoose.Schema.Types.ObjectId],
  equipment: {
    weapon: mongoose.Schema.Types.ObjectId,
    armor: mongoose.Schema.Types.ObjectId
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  }
});

module.exports = Character;