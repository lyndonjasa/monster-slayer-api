const { DungeonRequest, EnterDungeonRequest, BattleRequest } = require("../requests");
const { Enemy, Dungeon, Character, Item, Inventory, Skill } = require("../mongo/models");
const { randomizeEncounter, randomizeDrop } = require("../shared/randomizer");
const { lvlFinder } = require("../shared/exp-table");
const KeyValuePair = require("../shared/key-value-pair");
const { increment } = require("../shared/class-stats");

/**
 * 
 * @param {Array<DungeonRequest>} requests 
 */
const uploadDungeons = async(requests) => {
  const session = await Dungeon.startSession();
  session.startTransaction();

  const dungeons = [];
  try {
    for (let index = 0; index < requests.length; index++) {
      const request = requests[index];
      
      const enemyList = request.enemies.map(e => e);
      const bossName = request.bossReq;
  
      const dungeon = request;
      delete dungeon.enemies;
      delete dungeon.bossReq;
  
      const enemies = await Enemy.find({ name: { $in: enemyList } });
      dungeon.enemies = enemies.map(e => e._id);
  
      if (bossName !== "") {
        const boss = await Enemy.findOne({ name: bossName });
        dungeon.bossReq = boss._id;
      } else {
        dungeon.bossReq = null;
      }

      const dungeonModel = new Dungeon(dungeon);
      await dungeonModel.save();
    
      dungeons.push(dungeonModel);
    }

    session.commitTransaction();
  } catch (error) {
    throw error;
  } finally {
    session.endSession();
  }

  return dungeons;
}

const getDungeons = async() => {
  try {
    const dungeons = await Dungeon.find({}).populate("enemies", "name").populate("bossReq", "name").exec();
    const count = await Dungeon.find({}).countDocuments(); 

    return { count, dungeons };
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {EnterDungeonRequest} request 
 */
const enterDungeon = async(request) => {
  const character = await Character.findById(request.characterId);
  const dungeon = await Dungeon.findById(request.dungeonId).populate("enemies", "encRate");

  // if no character/dungeon is found, throw 
  if (!character) throw { code: 400, error: "No character found" }
  if (!dungeon) throw { code: 400, error: "Invalid dungeon Id" }

  // check if character has access to dungeon, throw if none
  const access = character.dungeonAccess.find(x => x == request.dungeonId);
  if (!access) throw { code: 400, error: "Character has no access to this dungeon" }

  // map enemies to id/rate pair
  const enemies = dungeon.enemies.map(e => new KeyValuePair(e._id.toString(), e.encRate));
  const enemyId = randomizeEncounter(enemies);

  const enemy = await Enemy.findById(enemyId).select("name level image stats")
                          .populate("skills");

  return {
    dungeon: { _id: dungeon._id, image: dungeon.image },
    enemy
  };
}

/**
 * 
 * @param {BattleRequest} request 
 */
const battleOutcome = async(request) => {
  debugger
  const character = await Character.findById(request.characterId).populate("skills", "");
  const dungeon = await Dungeon.findById(request.dungeonId)
                      .populate({ 
                        path: "enemies",
                        select: "drops exp boss",
                        populate: {
                          path: "drops",
                          select: "dropRate"
                        }
                      });

  // if no character/dungeon is found, throw 
  if (!character) throw { code: 400, error: "No character found" }
  if (!dungeon) throw { code: 400, error: "Invalid dungeon Id" }

  // check if character has access to dungeon, throw if none
  const access = character.dungeonAccess.find(x => x == request.dungeonId);
  if (!access) throw { code: 400, error: "Character has no access to this dungeon" }

  // check if enemy belongs to the correct dungeon
  const enemy = dungeon.enemies.find(x => x._id == request.enemyId);
  if (!enemy) throw { code: 400, error: "Enemy does not belong to this dungeon" }

  // get random item drop
  let itemDrop;
  const drops = Array.from(enemy.drops.map(d => new KeyValuePair(d._id.toString(), d.dropRate)));
  const itemId = randomizeDrop(drops);
  if (itemId !== "none") {
    itemDrop = await Item.findById(itemId);
  }

  let lvlUp = false, newSkills = [], unlockedDungeons = [];

  // update character level and inventory
  const session = await Character.startSession();
  session.startTransaction();
  try {
    debugger
    // add enemy exp to current
    const totalExp = character.totalExp + enemy.exp;
    // get new level and next level exp req
    const { newLvl, nxtLvlExp } = lvlFinder(totalExp);

    // get skills learned
    const currentSkills = await Skill.find({ classId: character.classType, lvlReq: { $lte: character.level } });
    const skillIds = currentSkills.map(s => s._id.toString());
    const skillsLearned = await Skill.find({ classId: character.classType, lvlReq: { $lte: newLvl } });
    skillsLearned.filter(s => !skillIds.includes(s._id.toString())).forEach(s => {
      // add new skills to output
      newSkills.push(s.name);
    });

    // increment stats if character leveled up
    if (character.level != newLvl) {
      lvlUp = true;
      const statIncrement = increment.find(x => x.classId == character.classType);
      const multiplier = newLvl - character.level;
      const keys = Object.keys(statIncrement);
      keys.forEach(key => {
        character.stats[key] += (statIncrement[key] * multiplier)
      });
    }

    // update character details
    character.totalExp = totalExp;
    character.level = newLvl;
    character.nextLevelExp = nxtLvlExp;

    // check if enemy is boss to unlock next dungeon
    if (enemy.boss) {
      const dungeonsUnlocked = await Dungeon.find({ bossReq: enemy._id });
      // add to dungeon access if not yet available
      dungeonsUnlocked.filter(d => !character.dungeonAccess.includes(d._id)).forEach(d => {
        character.dungeonAccess.push(d._id);
        unlockedDungeons.push(d.name);
      });
    }

    // add to inventory if an item is dropped
    if (itemDrop) {
      const inventoryItem = new Inventory({ characterId: character._id, item: itemDrop._id });
      await inventoryItem.save();
    }

    await character.save();

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }

  return {
    exp: enemy.exp,
    lvlUp,
    drop: itemDrop ? itemDrop.name : "",
    newSkills,
    unlockedDungeons
  }
}

module.exports = { uploadDungeons, getDungeons, enterDungeon, battleOutcome };