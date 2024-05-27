const express = require("express");
const router = express.Router();
const { getAll, createTodo, updateTodo, deleteTodo } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");

router.get("/", authenticateUser, authorizeRoles("USER", "ADMIN"), getAll);
router.post("/create", authenticateUser, authorizeRoles("USER", "ADMIN"), createTodo);
router.put("/update/:id", authenticateUser, authorizeRoles("USER", "ADMIN"), updateTodo);
router.delete("/delete/:id", authenticateUser, authorizeRoles("USER", "ADMIN"), deleteTodo);

module.exports = router;
