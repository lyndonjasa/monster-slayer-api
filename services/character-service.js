const { Character } = require("../mongo/models");
const mongoose = require("mongoose");

const getAccountCharacter = async (accountId) => {
  try {
    const character = await Character.findOne({ accountId: accountId })
      .populate("skills")
      .populate("equipment.weapon")
      .populate("equipment.armor")
      .populate("dungeonAccess", "name")
      .exec();

    return character;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAccountCharacter };