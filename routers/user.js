const router = require("express").Router();
const {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
} = require("../controllers/user");

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
