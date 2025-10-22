const express = require("express");
const Controller = require("./controller");

const router = express.Router();

router.post("/api/v1/user/register", Controller.collectInfoControllerApi);
router.post("/user/register", Controller.collectInfoControllerWeb);

module.exports = router;