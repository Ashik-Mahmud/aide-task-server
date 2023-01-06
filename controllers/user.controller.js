// brand new controller for user

const registerUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
};
