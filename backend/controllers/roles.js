const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      include: { privileges: true },
    });
    res.json(roles);
  } catch (err) {
    res.status(500).send("Error fetching roles");
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await prisma.role.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { privileges: true },
    });
    if (!role) return res.status(404).send("Role not found");
    res.json(role);
  } catch (err) {
    res.status(500).send("Error fetching role");
  }
};

const createRole = async (req, res) => {
  try {
    const { name, description, privileges } = req.body;

    const newRole = await prisma.role.create({
      data: {
        name,
        description,
        privileges: {
          create: privileges,
        },
      },
    });

    res.json(newRole);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating role");
  }
};

const updateRole = async (req, res) => {
  try {
    const { name, description, privileges } = req.body;

    const updatedRole = await prisma.role.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description,
        privileges: {
          deleteMany: {},
          create: privileges,
        },
      },
    });

    res.json(updatedRole);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating role");
  }
};

const deleteRole = async (req, res) => {
  try {
    await prisma.rolePrivilege.deleteMany({
      where: { roleId: parseInt(req.params.id) },
    });

    await prisma.role.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.send("Role deleted");
  } catch (err) {
    res.status(500).send("Error deleting role");
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
