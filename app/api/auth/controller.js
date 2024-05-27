const { login } = require("../../services/auth");

const { StatusCodes } = require("http-status-codes");

const loginTodo = async (req, res, next) => {
  try {
    const result = await login(req);
    res.status(StatusCodes.CREATED).json({
      data: { token: result.token, level: result.level },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { loginTodo };
