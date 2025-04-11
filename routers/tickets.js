const router = require("express").Router();
const {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/tickets");

router.post("/", createTicket);
router.get("/", getTickets);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
