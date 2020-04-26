const express = require('express');
const router = express.Router();

const { DungeonRequest } = require("../requests");
const { DungeonService } = require("../services");

router.get("/dungeons", async(req, res) => {
  try {
    const dungeons = await DungeonService.getDungeons();

    res.send(dungeons);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

module.exports = router;