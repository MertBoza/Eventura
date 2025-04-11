const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      location,
      imagePath,
      categoryId,
      organizerId,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
        imagePath,
        categoryId,
        organizerId,
      },
    });

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating event");
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        category: true,
        organizer: true,
        tickets: true,
      },
    });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        organizer: true,
        tickets: true,
      },
    });

    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching event");
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      date,
      location,
      imagePath,
      categoryId,
      organizerId,
    } = req.body;

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        date: date ? new Date(date) : undefined,
        location,
        imagePath,
        categoryId,
        organizerId,
      },
    });

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating event");
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: { id: parseInt(id) },
    });

    res.send("Event deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting event");
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
