const { StatusCodes } = require("http-status-codes");
const { getAllTodolist, createTodoList, updateTodoList, deleteTodoList } = require("../../services/todolist");

const getAll = async (req, res, next) => {
  try {
    const result = await getAllTodolist(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const result = await createTodoList(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const result = await updateTodoList(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const result = await deleteTodoList(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, createTodo, updateTodo, deleteTodo };
