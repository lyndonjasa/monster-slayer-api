class EnterDungeonRequest {
  constructor(request) {
    this.characterId = request.characterId;
    this.dungeonId = request.dungeonId;
  }
}

module.exports = EnterDungeonRequest;