const express = require('express');
const router = express.Router();

const { DungeonRequest, EnterDungeonRequest, BattleRequest } = require("../requests");
const { DungeonService } = require("../services");

// get list of dungeons
router.get("/dungeons", async(req, res) => {
  try {
    const dungeons = await DungeonService.getDungeons();

    res.send(dungeons);
  } catch (error) {
    res.status(500).send(error);
  }
});

// upload dungeons
router.post("/dungeons", async(req, res) => {
  try {
    const requests = req.body;
    const dungeonRequests = requests.map(r => new DungeonRequest(r));

    const response = await DungeonService.uploadDungeons(dungeonRequests);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

// enter dungeon
router.post("/dungeons/enter", async(req, res) => {
  try {
    const request = new EnterDungeonRequest(req.body);

    const enemy = await DungeonService.enterDungeon(request);

    res.send(enemy);
  } catch (error) {
    const { code } = error;
    if (code) {
      res.status(code).send(error.error);
    } else {
      res.status(500).send(error);
    }
  }
});

// battle outcome
router.post("/dungeons/battle", async(req, res) => {
  try {
    const request = new BattleRequest(req.body);
    const outcome = await DungeonService.battleOutcome(request);
    
    res.send(outcome);
  } catch (error) {
    const { code } = error;
    if (code) {
      res.status(code).send(error.error);
    } else {
      res.status(500).send(error);
    }
  }
});

module.exports = router;