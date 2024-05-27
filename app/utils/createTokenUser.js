const createTokenUser = (user) => {
  return {
    username: user.username,
    name: user.name,
    password: user.password,
    level: user.level,
    id: user.id,
  };
};

module.exports = {
  createTokenUser,
};
