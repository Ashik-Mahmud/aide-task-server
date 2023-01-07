// brand new controller for user

const registerUser = async (req, res) => {
  try {

    const data = req.body;
    console.log(data);
    

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
};
