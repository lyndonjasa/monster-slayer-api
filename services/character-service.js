const { Character } = require("../mongo/models");

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

module.exports = { getAccountCharacter };