const { DungeonRequest, EnterDungeonRequest } = require("../requests");
const { Enemy, Dungeon, Character } = require("../mongo/models");
const { randomizeEncounter } = require("../shared/randomizer");
const KeyValuePair = require("../shared/key-value-pair");

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

  const enemy = await Enemy.findById(enemyId).select("name level image")
                          .populate("skills");

  return enemy;
}

module.exports = { uploadDungeons, getDungeons, enterDungeon };