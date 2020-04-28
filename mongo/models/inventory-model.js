const mongoose = require("mongoose");

const Inventory = mongoose.model("Inventory", {
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character"
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }]
});

module.exports = Inventory;