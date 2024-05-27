const prisma = require("../db");
const { BadRequestError, NotFoundError } = require("../errors");

// Get All Todolist
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
// CreateTodoList
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
// UpdateTodoList
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

// Delete Todolist Data
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

// Change Status of Todolist To Completed
const setComplete = async (req) => {
  const id = parseInt(req.params.id);
  const result = await prisma.todolist.update({
    where: {
      id: id,
    },
    data: {
      status: "COMPLETED",
    },
  });
  if (!result) throw new NotFoundError(`Tidak ada Todolist dengan Id: ${id}`);
  return result;
};

const findOneTodolist = async (req) => {
  const { id } = parseInt(req.params.id);
  const result = await prisma.todolist.findUnique({
    where: {
      id: id,
    },
  });
  if (!result) throw new NotFoundError(`Tidak ada Todolist dengan Id: ${id}`);
  return result;
};
module.exports = { getAllTodolist, createTodoList, updateTodoList, deleteTodoList, setComplete, findOneTodolist };
