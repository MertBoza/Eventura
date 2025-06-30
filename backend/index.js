const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const ticketsRouter = require("./routers/tickets");
const contactusRouter = require("./routers/contactus");
const userRouter = require("./routers/user");
const eventRoutes = require("./routers/events");
const rolesRouter = require("./routers/roles");
const categoryRoutes = require("./routers/categories");
app.use("/categories", categoryRoutes);
app.use("/roles", rolesRouter);
app.use("/uploads", express.static("uploads"));
app.use("/events", eventRoutes);
app.use("/contactus", contactusRouter);

app.use("/user", userRouter);

app.use("/tickets", ticketsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
