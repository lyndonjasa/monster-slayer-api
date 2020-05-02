class BattleRequest {
  constructor(battle) {
    this.dungeonId = battle.dungeonId;
    this.characterId = battle.characterId;
    this.enemyId = battle.enemyId;
  }
}

module.exports = BattleRequest;