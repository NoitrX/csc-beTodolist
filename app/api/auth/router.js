const express = require("express");
const router = express.Router();

const { loginTodo } = require("../../api/auth/controller");

router.post("/login/user", loginTodo);

module.exports = router;
