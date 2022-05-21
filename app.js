//external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const router = express.Router();
//internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandlar");
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const inboxRouter = require("./routers/inboxRouter");

// express app initialization
const app = express();

// dotenv config
dotenv.config();
//connection mongodb with mongoose
mongoose
  .connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//request parses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static path
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_PARSER));

// template engine
app.set("view engine", "ejs");

//application route
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 error handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

//listening app
app.listen(process.env.PORT, () => {
  console.log(`listing app to ${process.env.PORT} port`);
});
