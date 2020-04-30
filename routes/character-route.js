const express = require('express');
const router = express.Router();

const { CharacterService } = require("../services");
const { EquipmentRequest } = require("../requests");

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

router.put("/character/:id/equipment", async(req, res) => {
  try {
    const request = new EquipmentRequest(req.body);
    const id = req.params.id;

    await CharacterService.updateEquipment(id, request);

    res.status(200).send();
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