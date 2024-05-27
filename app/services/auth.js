const prisma = require("../db");
const { BadRequestError, UnauthorizedError } = require("../errors");
const bcrypt = require("bcrypt");
const { createTokenUser, createJWT } = require("../utils");

const login = async (req) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Email / Password Salah!!");
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new UnauthorizedError("Email / Password Salah!");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createTokenUser(user) });
  return { token, role: user.level };
};

module.exports = { login };
