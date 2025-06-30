const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getAllContactMessages,
} = require("../controllers/contactus");

router.post("/", createContactMessage);

router.get("/", getAllContactMessages);

module.exports = router;
