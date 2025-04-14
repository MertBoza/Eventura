const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId: 1,
      },
    });
    res.json({ message: "User created", user: createUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.send("User deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, roleId } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { firstName, lastName, email, password, roleId },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
  login,
};
