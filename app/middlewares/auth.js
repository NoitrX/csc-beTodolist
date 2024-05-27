const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    console.log(authHeader, "authheader");
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }
    console.log(token, "myToken");
    if (!token) {
      throw new UnauthorizedError("Authentication Invalid");
    }

    const payload = isTokenValid({ token });

    req.user = {
      username: payload.username,
      level: payload.level,
      name: payload.name,
      id: payload.id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.level)) {
      throw new UnauthorizedError("Unauthorized to Access this Route!");
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
};
