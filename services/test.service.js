// Import database here!!
// Error response
const { BadRequestError } = require("../responses/error.response");

class TestService {
  Test = async () => {
    return "This is test ";
  };
}

module.exports = new TestService();
