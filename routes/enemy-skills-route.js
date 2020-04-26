const express = require('express');
const router = express.Router();

const { EnemySkill } = require("../mongo/models");

router.get("/enemy-skills", async(req, res) => {
  try {
    const enemySkills = await EnemySkill.find({});

    res.send(enemySkills);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;