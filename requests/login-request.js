const Request = require("./request");

class LoginRequest extends Request {
  constructor(credentials) {
    super(credentials);
  }

  get getUsername() {
    return this.username;
  }

  get getPassword() {
    return this.password;
  }
}

module.exports = LoginRequest;