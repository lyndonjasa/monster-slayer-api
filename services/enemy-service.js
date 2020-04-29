const { EnemyRequest } = require("../requests");
const { Enemy, EnemySkill, Item } = require("../mongo/models");

const getEnemies = async() => {
  try {
    const enemies = await Enemy.find({}).populate("skills").populate("drops", "name").exec();
    const count = await Enemy.find({}).countDocuments();

    return { count, enemies };
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {Array<EnemyRequest>} requests 
 */
const uploadEnemies = async(requests) => {
  const session = await Enemy.startSession();
  session.startTransaction();

  const enemies = [];
  try {
    for (let index = 0; index < requests.length; index++) {
      const request = requests[index];
      
      const isBoss = request.boss === 1 ? true : false;
      const enemy = request;
      const drops = request.drops.map(d => d);
      const enemySkills = request.skills.map(s => s);
  
      delete enemy.drops;
      delete enemy.skills;
  
      const items = await Item.find({ name: { $in: drops } });
      enemy.drops = items.map(i => i._id);
  
      const skills = await EnemySkill.find({ name: { $in: enemySkills } });
      enemy.skills = skills.map(s => s._id);

      enemy.boss = isBoss;

      const enemyModel = new Enemy(enemy);

      await enemyModel.save();
  
      enemies.push(enemyModel);
    }

    await session.commitTransaction();
  } catch (error) {
    throw error;
  } finally {
    session.endSession();
  }

  return enemies;
}

module.exports = { uploadEnemies, getEnemies };