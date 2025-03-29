const { z } = require("zod");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// zod validation
// checking if already present
// password encrypting
// save user into db

const singUpUser = async (req, res) => {
  const requiredSchema = z.object({
    email: z.string().min(7).max(100).email(),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(/[A-Z]/, "Password must contain capital letter")
      .regex(/[^A-Za-z0-9]/, "password must contain a special symbol"),
    username: z.string().max(100),
  });

  const parsedData = requiredSchema.safeParse(req.body);

  if (!parsedData.success) {
    // returning first invalid input's error message
    return res.json({
      message: "Invalid Data format",
      error: parsedData.error.issues[0].message,
    });
  }

  const { email, password, username } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(409).json("User already exists");

    // hashing password and salt addition

    const hashedPass = await bcrypt.hash(password, 5);

    await User.create({ email, password: hashedPass, username });
    res.json("User sign up done");
    console.log("User sign up done");
  } catch (error) {
    res.status(500).json({
      message: "an error occurred",
      error: error,
    });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(409).json("user doesn't exists");

    const passwordMatched = bcrypt.compare(user.password, password);

    if (!passwordMatched) return res.status(409).json("wrong password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    // setting auth cookie
    res.cookie("userAuth", token);
    res.json({ token });
    
  } catch (error) {
    res.status(500).json({
      message: "an error occurred",
      error: error,
    });
  }
};

module.exports = { signInUser, singUpUser };
