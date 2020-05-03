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

router.delete("/character/:id/inventory/:inventoryId", async(req, res) => {
  try {
    const characterId = req.params.id;
    const inventoryId = req.params.inventoryId;

    await CharacterService.removeItem(characterId, inventoryId);

    res.send();
  } catch (error) {
    const { code } = error;
    if (code) {
      res.status(code).send(error.error);
    } else {
      res.status(500).send(error);
    }
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

router.get("/character/:id/skills", async(req, res) => {
  try {
    const id = req.params.id;
    const skills = await CharacterService.getCharacterSkills(id);

    res.send(skills);
  } catch (error) {
    res.status(500).send(error); 
  }
});

router.put("/character/:id/skills", async(req, res) => {
  try {
    const id = req.params.id;
    const skills = req.body;

    await CharacterService.updateSkills(id, skills);

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

router.get("/character/:id/dungeons", async(req, res) => {
  try {
    const id = req.params.id;
    const dungeons = await CharacterService.getDungeonAccess(id);

    res.send(dungeons);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;