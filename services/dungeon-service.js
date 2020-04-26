const { DungeonRequest } = require("../requests");
const { Enemy, Dungeon } = require("../mongo/models");

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

module.exports = { uploadDungeons, getDungeons };