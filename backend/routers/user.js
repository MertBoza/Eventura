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
router.post("/login", login);

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
