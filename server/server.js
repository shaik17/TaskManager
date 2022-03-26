const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errrorHandler");
const task = require("./routes/task");
const auth = require("./routes/auth.route");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
require("dotenv").config();
require("express-async-errors");

// middleware
app.use(
  bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(bodyparser.json({ limit: "50mb" }));
// app.use(notFound)
// app.use(errorHandler);
app.use("/api/v1", task);
app.use("/api/v1/auth", auth);

// port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
