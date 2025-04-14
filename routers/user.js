const router = require("express").Router();
const {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
  login,
} = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);

module.exports = router;
