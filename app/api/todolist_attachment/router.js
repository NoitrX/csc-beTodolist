const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");
const { getAll, inputDoc, downloadDoc } = require("./controller");
const { downloadAttachment } = require("../../services/todolist_attachment");

const upload = require("../../middlewares/multer");
router.get("/todolist_attachment/:id", authenticateUser, getAll);
router.get("/download/:id", authenticateUser, authorizeRoles("ADMIN", "USER"), downloadAttachment);
router.post("/todolist_attachment/create/:id", upload.single("file"), authenticateUser, inputDoc);

module.exports = router;
