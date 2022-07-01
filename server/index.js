const express = require("express");
const cookieParser = require('cookie-parser');
const {usersRouter, recordsRouter, quotesRouter} = require("./routes");
// const cors = require('cors');

// initialize app
const app = express();

// middleware
// app.use(cors({ origin: ['http://localhost:3000']}))
app.use(express.json());
app.use(cookieParser());

// base route for making sure server is operational
app.get('/', (req, res) => {
  res.sendStatus(304);
});

// routes
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use('/quotes', quotesRouter);
// app.use("/graphs", graphsRouter);


app.listen(8080, () => {
  console.log("listening on port 8080");
});
