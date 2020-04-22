class Request {
  constructor(param) {
    const keys = Object.keys(param);

    keys.forEach(key => {
      this[key] = param[key];
    });
  }
}

module.exports = Request;