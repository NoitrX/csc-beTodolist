const prisma = require("../db");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllAttachment = async (req) => {
  const id = parseInt(req.params.id);
  const result = await prisma.todoList_attachment.findMany({
    where: {
      id: id,
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
  const { file } = req.body;
  const result = await prisma.todoList_attachment.update({
    where: {
      id: id,
    },
    data: {
      file: file,
      todolistId: id,
      createdBy: req.user.id,
    },
  });
  if (!result) throw new NotFoundError(`Tidak dapat menemukan todolist`);
  return result;
};
module.exports = { getAllAttachment, inputAttachment };
