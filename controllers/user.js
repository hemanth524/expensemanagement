const userModel = require("../modules/userschema");

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    if (user.password !== password) {
      return res.status(401).send("Invalid Password");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const signupcontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the same email or username already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      // If user exists, return a specific message
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }

    // If no existing user, create a new user
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {logincontroller , signupcontroller };