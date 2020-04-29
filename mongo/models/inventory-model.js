const mongoose = require("mongoose");

const Inventory = mongoose.model("Inventory", {
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character"
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }
});

module.exports = Inventory;