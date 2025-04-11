const router = require("express").Router();
const { createUser } = require("../controllers/user");

router.post("/", createUser);
module.exports = router;
