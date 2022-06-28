const express = require("express");
const {usersRouter} = require("./routes");

// initialize app
const app = express();

// middleware
app.use(express.json());

// base route for making sure server is operational
app.get('/', (req, res) => {
  res.sendStatus(304);
});

// routes
app.use("/users", usersRouter);
// app.use("/records", routes.recordsRouter);
// app.use("/graphs", routes.graphsRouter);


app.listen(8080, () => {
  console.log("listening on port 8080");
});
