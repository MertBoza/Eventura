const router = require("express").Router();
const {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
} = require("../controllers/roles");
const verifyToken = require("../middleware/verifyToken");

router.post("/", createRole);

router.put("/:id", updateRole);

router.delete("/:id", deleteRole);

router.get("/", getRoles);

module.exports = router;
