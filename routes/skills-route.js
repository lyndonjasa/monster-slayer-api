const express = require('express');
const router = express.Router();

const Skill = require("../mongo/models/skills-model");

router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.send(skills);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/skills/:id", async (req, res) => {
  try {
    const skills = await Skill.findById(req.params.id);

    res.send(skills);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
