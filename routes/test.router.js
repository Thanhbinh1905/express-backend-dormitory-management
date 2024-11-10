const express = require("express");
const router = express.Router();
const AsyncHandle = require("../Helpers/AsyncHandle");
const TestController = require("../controllers/test.controller");

router.get("/", AsyncHandle(TestController.Test));

module.exports = router;
