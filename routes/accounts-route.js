const express = require('express');
const router = express.Router();

const { AccountRequest, LoginRequest } = require("../requests");
const { AccountService, CharacterService } = require("../services");

// create account
router.post("/accounts", async (req, res) => {
  const request = new AccountRequest(req.body);

  try {
    const account = await AccountService.createAccount(request);

    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

// login
router.post("/accounts/login", async (req, res) => {
  const request = new LoginRequest(req.body);

  try {
    const account = await AccountService.login(request);

    res.send(account);
  } catch ({code, error}) {
    res.status(code).send(error);
  }
});

// get account character
router.get("/accounts/:id/character", async (req, res) => {
  const id = req.params.id;

  try {
    const character = await CharacterService.getAccountCharacter(id);

    res.send(character);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;