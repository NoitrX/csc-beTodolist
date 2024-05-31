const prisma = require("../db");
const { BadRequestError, NotFoundError } = require("../errors");

// Get All Todolist
const getAllTodolist = async (req) => {
  const search = req.query.search_query || "";
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const offset = limit * page;
  const totalRows = await prisma.todolist.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          createdByUser: {
            name: {
              contains: search,
            },
          },
        },
        {
          updatedByUser: {
            name: {
              contains: search,
            },
          },
        },
      ],
    },
  });
  const result = await prisma.todolist.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          createdByUser: {
            name: {
              contains: search,
            },
          },
        },
        {
          updatedByUser: {
            name: {
              contains: search,
            },
          },
        },
      ],
    },
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
    skip: offset,
    take: limit,
  });
  return {
    totalRows: totalRows,
    page: page,
    limit: limit,
    totalPages: Math.ceil(totalRows / limit),
    data: result,
  };
};
// CreateTodoList
const createTodoList = async (req) => {
  const { name } = req.body;
  console.log(req.body);
  if (!name) {
    throw new BadRequestError("Nama Wajib Diisi!");
  }
  const result = await prisma.todolist.create({
    data: {
      name,
      createdBy: req.user.id,
    },
  });
  if (!result) {
    throw new BadRequestError("Gagal Membuat Todolist");
  }
  return result;
};
// UpdateTodoList
const updateTodoList = async (req) => {
  const id = parseInt(req.params.id);

  const { name, status } = req.body;
  if (!name || !status) {
    throw new BadRequestError("Nama dan Status Wajib Diisi!");
  }
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
  const id = parseInt(req.params.id);
  console.log(id, "aa");
  const result = await prisma.todolist.findUnique({
    where: {
      id: id,
    },
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

  if (!result) throw new NotFoundError(`Tidak ada Todolist dengan Id: ${id}`);
  return result;
};
module.exports = { getAllTodolist, createTodoList, updateTodoList, deleteTodoList, setComplete, findOneTodolist };
