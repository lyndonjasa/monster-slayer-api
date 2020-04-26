const express = require('express');
const router = express.Router();

const { Enemy } = require("../mongo/models");
const { EnemyRequest } = require("../requests");
const { EnemyService } = require("../services");

router.get("/enemies", async(req, res) => {
  try {
    const enemies = await EnemyService.getEnemies();

    res.send(enemies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/enemies", async(req, res) => {
  try {
    const request = req.body;
    const enemies = request.map(r => new EnemyRequest(r));

    const response = await EnemyService.uploadEnemies(enemies);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;