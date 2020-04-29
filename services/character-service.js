const { Character, Inventory } = require("../mongo/models");

const getAccountCharacter = async (accountId) => {
  try {
    const character = await Character.findOne({ accountId: accountId })
      .populate("skills", "name classId damage target cost type")
      .populate("equipment.weapon", "name bonus classId type")
      .populate("equipment.armor", "name bonus classId type")
      .populate("dungeonAccess", "name")
      .exec();

    return character;
  } catch (error) {
    throw error;
  }
}

const getCharacter = async(characterId) => {
  try {
    const character = await Character.findById(characterId)
      .populate("skills", "name classId damage target cost type")
      .populate("equipment.weapon", "name bonus classId type")
      .populate("equipment.armor", "name bonus classId type")
      .populate("dungeonAccess", "name")
      .exec();

    return character;
  } catch (error) {
    throw error;
  }
}

const getInventory = async(characterId) => {
  try {
    const inventory = await Inventory.find({ characterId: characterId })
      .populate("item", "name bonus classId type")
      .exec();
    
    return inventory;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAccountCharacter, getCharacter, getInventory };