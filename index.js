const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// Routing
const loginRouter = require("./app/api/auth/router");
const todoListRouter = require("./app/api/todolist/router");
const todoListAttachmentRouter = require("./app/api/todolist_attachment/router");
// MIDDLEWARE
const handlerErrorMiddleware = require("./app/middlewares/handler-error");
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.get("/", function (req, res) {
  res.send("Hello world!");
});

const v1 = "/api/todo";
app.use(v1, loginRouter);
app.use(v1, todoListRouter);
app.use(v1, todoListAttachmentRouter);
app.use(handlerErrorMiddleware);
app.listen(9000);
