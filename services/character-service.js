const { Character, Inventory } = require("../mongo/models");
const { EquipmentRequest } = require("../requests");
const mongoose = require("mongoose");

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

/**
 * 
 * @param {String} characterId 
 */
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

/**
 * 
 * @param {String} characterId 
 */
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

/**
 * 
 * @param {String} characterId 
 * @param {EquipmentRequest} request 
 */
const updateEquipment = async(characterId, request) => {
  const character = await Character.findById(characterId);
  
  if (!character) throw { code: 404, error: "No character found" };

  const { equipment } = character;
  equipment.weapon = mongoose.Types.ObjectId(request.weaponId);
  equipment.armor = mongoose.Types.ObjectId(request.armorId);

  await character.save();
}

module.exports = { getAccountCharacter, getCharacter, getInventory, updateEquipment };