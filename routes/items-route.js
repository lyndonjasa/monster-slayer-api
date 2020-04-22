const express = require('express');
const router = express.Router();

const { Item } = require("../mongo/models");

// Get all items
router.get("/items", async(req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get by item id
router.get("/items/:id", async(req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);

    if (item) {
      res.send(item);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get items by class Id
router.get("/items/class/:id", async(req, res) => {
  const classId = req.params.id;
  
  try {
    const items = await Item.find({ classId: classId }) || [];

    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;