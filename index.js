const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
const ticketsRouter = require("./routers/tickets")
const userRouter = require("./routers/user");
app.use("/user", userRouter);


app.use("/tickets", ticketsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
