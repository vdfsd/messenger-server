import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//registration controller
export const registration = async (req, res) => {
  try {
    const { email, username, fullname, password, avatar } = req.body;

    //check registered email
    const isUsedEmail = await User.findOne({ email });
    if (isUsedEmail) {
      return res.json({
        message: "This email is already registered",
      });
    }

    //check registared username
    const isUsedUsername = await User.findOne({ username });
    if (isUsedUsername) {
      return res.json({ message: "This username is already registered" });
    }
    // create password complexity
    const salt = bcrypt.genSaltSync(10);

    // hash password
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      username,
      fullname,
      password: hash,
      avatar,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //save new user in db
    await newUser.save();

    res.status(200).json({
      token,
      newUser,
      message: "Registration completed successfully",
    });
  } catch (error) {
    console.log("error");
    res.json({ message: "Error creating a user" });
  }
};

//login controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "The user does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(402).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.json({
      token,
      user,
      message: "You are logged in!",
    });
  } catch (error) {
    console.log("error");
    res.json({ message: "User authorization error" });
  }
};

//get me controller
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.josn({ message: "The user does not exist." });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({
      message: "No access",
    });
  }
};
