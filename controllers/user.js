const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const createUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        roleId: 1,
      },
    });
    res.json(createUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { createUser };
