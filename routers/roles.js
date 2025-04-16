const router = require("express").Router();
const {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
} = require("../controllers/roles");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, createRole);

router.put("/:id", verifyToken, updateRole);

router.delete("/:id", verifyToken, deleteRole);

router.get("/", verifyToken, getRoles); 

module.exports = router;
