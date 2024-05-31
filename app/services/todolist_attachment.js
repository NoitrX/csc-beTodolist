const path = require("path");
const prisma = require("../db");
const archiver = require("archiver");
const fs = require("fs");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllAttachment = async (req) => {
  const id = parseInt(req.params.id);
  const result = await prisma.todoList_attachment.findMany({
    where: {
      todolistId: id,
    },
    include: {
      createdByUser: {
        select: {
          name: true,
          id: true,
        },
      },
      updatedByUser: {
        select: {
          name: true,
          id: true,
        },
      },
      todolist: {
        select: {
          id: true,
          name: true,
          status: true,
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });
  return result;
};

const inputAttachment = async (req) => {
  const id = parseInt(req.params.id);
  const result = await prisma.todoList_attachment.create({
    data: {
      file: req.file ? `uploads/${req.file.filename}` : "",
      todolistId: id,
      createdBy: req.user.id,
    },
  });
  if (!result) throw new NotFoundError(`Tidak dapat menemukan todolist`);
  return result;
};

const downloadAttachment = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await prisma.todoList_attachment.findMany({
      where: {
        todolistId: id,
      },
    });

    if (result.length === 0) {
      return res.status(400).json({ error: "File Tidak Tersedia" });
    }

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename=todolist_${id}.zip`);

    const archive = archiver("zip");
    archive.pipe(res);

    archive.on("error", (err) => {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
    });

    result.forEach((item) => {
      // Adjust filePath correctly
      const filePath = path.resolve(__dirname, "../../public/", item.file);
      console.log(filePath, "Ad");
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: path.basename(filePath) });
      } else {
        console.error(`File not found: ${filePath}`);
      }
    });

    archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllAttachment, inputAttachment, downloadAttachment };
