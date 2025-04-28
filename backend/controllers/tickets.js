const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTicket = async (req, res) => {
  try {
    const { eventId, userId, price, status } = req.body;

    const newTicket = await prisma.ticket.create({
      data: {
        eventId,
        userId,
        price,
        status: status || "available",
      },
    });

    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTickets = async (req, res) => {
  try {
    const { userId, eventId } = req.query;

    const tickets = await prisma.ticket.findMany({
      where: {
        ...(userId && { userId: parseInt(userId) }),
        ...(eventId && { eventId: parseInt(eventId) }),
      },
      include: {
        event: true,
        user: true,
      },
    });

    res.json(tickets);
  } catch (error) {
    console.error("Get Tickets Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, price, status } = req.body;

    const updatedTicket = await prisma.ticket.update({
      where: { id: parseInt(id) },
      data: {
        userId,
        price,
        status,
      },
    });

    res.json(updatedTicket);
  } catch (error) {
    console.error("Update Ticket Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.ticket.delete({
      where: { id: parseInt(id) },
    });


    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Delete Ticket Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
};
