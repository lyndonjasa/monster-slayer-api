const { Character } = require("../mongo/models");
const mongoose = require("mongoose");

const getAccountCharacter = async (accountId) => {
  try {
    const character = await Character.findOne({ accountId: accountId })
      .populate("skills")
      .populate("equipment.weapon")
      .populate("equipment.armor")
      .exec();

    return character;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAccountCharacter };