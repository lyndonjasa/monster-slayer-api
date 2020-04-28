const express = require('express');
const router = express.Router();

const { CharacterService } = require("../services");

router.get("/character/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const character = await CharacterService.getCharacter(id);

    res.send(character);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/character/:id/inventory", async(req, res) => {
  try {
    const id = req.params.id;
    const inventory = await CharacterService.getInventory(id);

    res.send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;