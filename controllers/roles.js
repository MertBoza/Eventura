const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const role = await prisma.role.create({
      data: {
        name,
        description,
      },
    });
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedRole = await prisma.role.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
      },
    });

    res.json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.role.delete({
      where: { id: parseInt(id) },
    });

    res.send("Role deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
};
