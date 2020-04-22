const { AccountRequest, LoginRequest } = require("../requests/");
const { Account, Character, Item, Skill } = require("../mongo/models");
const { baseStats } = require("../shared/class-stats");

/**
 * 
 * @param {AccountRequest} request 
 */
const createAccount = async(request) => {
  const account = new Account({
    fullName: request.getFullName,
    email: request.getEmail,
    username: request.getUsername,
    password: request.getPassword
  });

  const session = await Account.startSession();
  session.startTransaction();

  try {

    await account.save();

    const character = {
      classType: request.getClassType,
      name: request.getCharacterName,
      accountId: account._id,
      totalExp: 0
    };

    // get character base stats
    character.stats = baseStats.find(x => x.classId === request.getClassType);

    // get character base skillset
    // map _id only
    const skills = await Skill.find({ classId: request.getClassType, lvlReq: 1 });
    character.skills = skills.map(x => x._id);

    // get character base equipment
    // map _id only
    const items = await Item.find({ classId: request.getClassType });
    character.equipment = {
      weapon: items.find(x => x.type === "WPN")._id,
      armor: items.find(x => x.type === "AMR")._id
    };

    new Character(character).save();

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
  
  return { accountId: account._id };
}

/**
 * 
 * @param {LoginRequest} request 
 */
const login = async(request) => {
  try {
    debugger
    const account = await Account.findOne({ username: request.getUsername, password: request.getPassword });

    if (account) {
      return { accountId: account._id };
    } else {
      throw { code: 404, error: "no account found associated with the credentials" }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { createAccount, login };