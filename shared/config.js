const configuration = {
  mongoConnection: process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/monster-slayer",
  environment: "Staging"
};

module.exports = configuration;