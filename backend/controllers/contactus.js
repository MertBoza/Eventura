const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contactMessage = await prisma.contactUs.create({
      data: { name, email, subject, message },
    });

    res.status(201).json(contactMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create contact message" });
  }
};

const getAllContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contactUs.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
};
