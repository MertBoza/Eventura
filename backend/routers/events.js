const router = require("express").Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const verifyToken = require("../middleware/verifyToken");
const multer = require("../middleware/multer");

router.post("/", verifyToken,multer, createEvent);
router.get("/",  getAllEvents);
router.get("/:id",  getEventById);
router.put("/:id", verifyToken,multer, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;