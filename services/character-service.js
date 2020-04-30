const { Character, Inventory, Skill, Dungeon } = require("../mongo/models");
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

/**
 * 
 * @param {String} characterId 
 */
const getCharacterSkills = async(characterId) => {
  const character = await Character.findById(characterId);
  const { level, classType } = character;

  const availableSkills = await Skill.find({ classId: classType, lvlReq: { $lte: level } });

  return availableSkills;
}

/**
 * 
 * @param {String} characterId 
 * @param {Array<String>} skills 
 */
const updateSkills = async(characterId, skills) => {
  debugger
  const character = await Character.findById(characterId);

  if (!character) throw { code: 404, error: "No character found" };

  const skillIds = [];
  skills.forEach(skill => {
    skillIds.push(mongoose.Types.ObjectId(skill));
  })

  character.skills = skillIds;

  await character.save();
}

/**
 * 
 * @param {String} characterId 
 */
const getDungeonAccess = async(characterId) => {
  const character = await Character.findById(characterId);
  const allDungeons = await Dungeon.find({})
                        .populate({ 
                          path: "enemies",
                          select: "name boss",
                          populate: {
                            path: "drops",
                            select: "name classId type"
                          }
                        });

  debugger
  const access = character.dungeonAccess.map(x => x._id) || [];
  const dungeons = allDungeons.map(x => x.toJSON());
  dungeons.filter(x => access.includes(x._id)).forEach(d => {
    d.locked = false;
  });
  dungeons.filter(x => !access.includes(x._id)).forEach(d => {
    d.locked = true;
  });

  return dungeons;
}

module.exports = { 
  getAccountCharacter,
  getCharacter,
  getInventory, 
  updateEquipment,
  getCharacterSkills,
  updateSkills,
  getDungeonAccess
};