const bcrypt = require("bcrypt");

// brand new controller for user
const {
  findUserByUsernameAndEmailService,
  createUserService,
  findUserByEmailService,
  getAllUsersService,
  findUserByIdService,
  updateUserService,
  deleteUserService,
} = require("../services/userService");
const { UploadImage, DeleteImage } = require("../utils/Cloudinary");
const generateToken = require("../utils/GenerateToken");

const registerUser = async (req, res) => {
  try {
    const { email, username, password, ...others } = JSON.parse(req.body.data);
    const isExist = await findUserByUsernameAndEmailService(username, email);
    if (isExist) {
      return res.status(400).send({
        message: "User already exist",
        success: false,
      });
    }
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (req.file?.path) {
      const result = await UploadImage(req.file.path, "avatar");
      const avatar = result.secure_url;
      const publicId = result.public_id;
      if (avatar) {
        others.avatar = {
          url: avatar,
          publicId,
        };
      }
    }

    const data = {
      email,
      username,
      password: hashedPassword,
      ...others,
    };

    const user = await createUserService(data);

    return res.status(200).send({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong - " + err.message,
      success: false,
    });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmailService(email);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid credentials",
        success: false,
      });
    }
    const token = await generateToken(user._id);
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong - " + err.message,
      success: false,
    });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const { _id } = req.user;
    const { limit, page, q } = req.query;

    const filters = {
      fields: {
        // except me 
        _id: { $ne: _id },
      },
    };

    if (q) {
      filters.fields.$or = [
        { username: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
      ];
    }

    if (limit && page) {
      filters.limit = parseInt(limit);
      filters.page = parseInt(page);
      filters.skip = (parseInt(page) - 1) * parseInt(limit);
    }

    const users = await getAllUsersService(filters);
    return res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      users: users,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong - " + err.message,
      success: false,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, ...others } = JSON.parse(req.body.data);
    const isExist = await findUserByUsernameAndEmailService(username, email);
    if (isExist) {
      return res.status(400).send({
        message: "User already exist",
        success: false,
      });
    }

    if (isExist?.avatar?.public_id) {
      await DeleteImage(isExist.avatar.public_id, "avatar");
    }

    if (req.file?.path) {
      const result = await UploadImage(req.file.path, "avatar");
      const avatar = result.secure_url;
      const publicId = result.public_id;
      if (avatar) {
        others.avatar = {
          url: avatar,
          publicId,
        };
      }
    }

    const data = {
      email,
      username,
      ...others,
    };

    const user = await updateUserService(id, data);
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: user,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong - " + err.message,
      success: false,
    });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserByIdService(id);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user: user,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong - " + err.message,
      success: false,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserByIdService(id);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }
    if (user.avatar?.public_id) {
      await DeleteImage(user.avatar?.public_id, "avatar");
    }
    await deleteUserService(id);
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong - " + err.message,
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
