const configuration = {
  // mongoConnection: "mongodb+srv://donjasa:d0nJasa0716@cluster0-t0jef.mongodb.net/monster-slayer",
  // mongoConnection: "mongodb+srv://monsterslayer:hRFLgvvKv15Pubx6@cluster0.mqizy.mongodb.net/monster-slayer",
  mongoConnection: process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/monster-slayer",
  environment: "Staging"
};

module.exports = configuration;