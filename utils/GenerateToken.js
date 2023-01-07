const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const payload = {
    user: {
      _id: userId,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
