const mp = new Map();

const setUser = (id, user) => {
  mp.set(id, user);
};

const getUser = (id) => {
  return mp.get(id);
};

module.exports = {
  setUser,
  getUser,
};
