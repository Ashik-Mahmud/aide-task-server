const bcrypt = require("bcrypt");

// brand new controller for user
const {
  findUserByUsernameAndEmailService,
  createUserService,
} = require("../services/userService");
const { UploadImage } = require("../utils/Cloudinary");

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

    return res
      .status(200)
      .send({
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

module.exports = {
  registerUser,
};
