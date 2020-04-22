const mongoose = require("mongoose");

const Item = mongoose.model("Item", {
  classId: Number,
  type: String,
  name: String,
  bonus: {
    health: Number,
    mana: Number,
    off: Number,
    def: Number,
    spd: Number,
    int: Number,
    luk: Number
  }
});

module.exports = Item;