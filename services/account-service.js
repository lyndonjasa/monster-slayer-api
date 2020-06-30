const { AccountRequest, LoginRequest } = require("../requests/");
const { Account, Character, Item, Skill, Dungeon, Inventory } = require("../mongo/models");
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
      nextLevelExp: 20,
      totalExp: 0,
      level: 1
    };

    // get character base stats
    character.stats = baseStats.find(x => x.classId == request.getClassType);

    // get character base skillset
    // map _id only
    const skills = await Skill.find({ classId: request.getClassType, lvlReq: 1 });
    character.skills = skills.map(x => x._id);

    // get character base equipment
    // map _id only
    const weapon = await Item.find({ classId: request.getClassType, type: "WPN" }).sort({ _id: 1 }).limit(1);
    const armor = await Item.find({ classId: request.getClassType, type: "AMR" }).sort({ _id: 1 }).limit(1);

    character.equipment = {
      weapon: weapon[0]._id,
      armor: armor[0]._id
    };

    const firstDungeon = await Dungeon.findOne({ name: "Grass Lands" });
    character.dungeonAccess = [firstDungeon._id];

    const charModel = await new Character(character).save();

    const inventory = [
      {
        characterId: charModel._id,
        item: weapon[0]._id
      },
      {
        characterId: charModel._id,
        item: armor[0]._id
      }
    ];

    await Inventory.insertMany(inventory);

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