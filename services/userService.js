const User = require("../models/userModel");

/* Find user by email */
exports.findUserByEmailService = async (email) => {
  const user = await User.findOne({
    email,
  });
  return user;
};

/* Find user by username */
exports.findUserByUsernameService = async (username) => {
  const user = await User.findOne({
    username,
  });
  return user;
};

/* find user by username and email together */
exports.findUserByUsernameAndEmailService = async (username, email) => {
  const user = await User.findOne({
    username,
    email,
  });
  return user;
};

/* Find user by id */
exports.findUserByIdService = async (id) => {
  const user = await User.findById(id);
  return user;
};

/* Create user */
exports.createUserService = async (data) => {
  const user = await User.create(data);
  return user;
};

/* Get all users */
exports.getAllUsersService = async (filters) => {
  const users = await User.find(filters.fields)
    .skip(filters.skip)
    .limit(filters.limit)
    .sort({ createdAt: -1 });
  return users;
};

/* Update user */
exports.updateUserService = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return user;
};

/* Delete user */
exports.deleteUserService = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
