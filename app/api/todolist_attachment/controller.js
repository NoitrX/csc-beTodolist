const { StatusCodes } = require("http-status-codes");
const { getAllAttachment, inputAttachment, downloadAttachment } = require("../../services/todolist_attachment");


const getAll = async (req, res, next) => {
  try {
    const result = await getAllAttachment(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const inputDoc = async (req, res, next) => {
  try {
    const result = await inputAttachment(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const downloadDoc = async (req, res, next) => {
  try {
    const result = await downloadAttachment(req, res);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { getAll, inputDoc, downloadDoc };
