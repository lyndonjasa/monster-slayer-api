const Request = require("./request");

class AccountRequest extends Request {
  constructor(account) {
    super(account);
  }

  get getFullName() {
    return this.fullName;
  }

  get getEmail() {
    return this.email;
  }

  get getUsername() {
    return this.username;
  }
  
  get getPassword() {
    return this.password;
  }

  get getCharacterName() {
    return this.characterName;
  }

  get getClassType() {
    return this.classType;
  }
}

module.exports = AccountRequest;