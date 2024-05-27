const prisma = require("../db");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTodolist = async (req) => {
  console.log(req.user, "s");
  const result = await prisma.todolist.findMany({
    include: {
      createdByUser: {
        select: {
          name: true,
        },
      },
      updatedByUser: {
        select: {
          name: true,
        },
      },
    },
  });
  return result;
};

const createTodoList = async (req) => {
  const { name } = req.body;
  console.log(req.body);
  const result = await prisma.todolist.create({
    data: {
      name,
      createdBy: req.user.id,
    },
  });
  return result;
};

const updateTodoList = async (req) => {
  const id = parseInt(req.params.id);

  const { name, status } = req.body;
  const check = await prisma.todolist.findUnique({
    where: {
      id: id,
    },
  });
  if (!check) throw new BadRequestError("Todo List Tidak Ditemukan!");
  const result = await prisma.todolist.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      status: status,
      updatedBy: req.user.id,
    },
  });
  if (!result) throw new NotFoundError(`Tidak ada Todolist dengan Id: ${id}`);
  return result;
};

const deleteTodoList = async (req) => {
  const id = parseInt(req.params.id);
  const check = await prisma.todolist.findUnique({
    where: {
      id: id,
    },
  });
  if (!check) throw new BadRequestError("Todo List Tidak Ditemukan!");
  const deleteUser = await prisma.todolist.delete({
    where: {
      id: id,
    },
  });
  if (!deleteUser) throw new NotFoundError(`Tidak ada Todolist dengan Id: ${id}`);
  return deleteUser;
};
module.exports = { getAllTodolist, createTodoList, updateTodoList, deleteTodoList };
