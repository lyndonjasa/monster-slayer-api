class DungeonRequest {
  constructor(dungeon) {
    this.name = dungeon.name;
    this.image = dungeon.image;
    this.recommendedLevel = dungeon.recommendedLevel;
    this.enemies = dungeon.enemies;
    this.bossReq = dungeon.bossReq;
  }
}

module.exports = DungeonRequest;