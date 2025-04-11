const router = require("express").Router();
const {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
} = require("../controllers/roles");

router.post("/", createRole);

router.put("/:id", updateRole);

router.delete("/:id", deleteRole);

router.get("/", getRoles);

module.exports = router;
 