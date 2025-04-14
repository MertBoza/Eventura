const router = require("express").Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const verifyToken = require("../middleware/verifyToken");

router.post("/", createEvent);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
