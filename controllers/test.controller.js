const { SuccessResponse } = require("../responses/success.response");
const TestService = require("../services/test.service");

class TestController {
  Test = async (req, res, next) => {
    new SuccessResponse({
      message: "This is test",
      metadata: await TestService.Test(),
    }).send(res);
  };
}

module.exports = new TestController();
