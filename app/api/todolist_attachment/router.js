const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");
const { getAll, inputDoc } = require("./controller");

const upload = require("../../middlewares/multer");
router.get("/todolist_attachment/:id", authenticateUser, getAll);
router.post("/todolist_attachment/create/:id", upload.single("file"), authenticateUser, inputDoc);

module.exports = router;
