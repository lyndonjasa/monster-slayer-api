const Request = require("./request");

class EnemyRequest {
  constructor(enemy) {
    this.name = enemy.name;
    this.level = enemy.level;
    this.image = enemy.image;
    this.encRate = enemy.encRate;
    this.exp = enemy.exp;
    this.stats = {
      health: enemy.stats.health,
      mana: enemy.stats.mana,
      off: enemy.stats.off,
      def: enemy.stats.def,
      agi: enemy.stats.agi,
      int: enemy.stats.int,
      luk: enemy.stats.luk
    };
    this.skills = enemy.skills;
    this.drops = enemy.drops;
  }
}

module.exports = EnemyRequest;