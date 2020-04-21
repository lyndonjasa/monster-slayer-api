const mongoose = require("mongoose");

const Account = mongoose.model("Account", {
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    requried: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Account;