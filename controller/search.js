import mongoose from "mongoose";
import User from "../model/User.js";

export const searchUsers = async (req, res) => {
  const { value, userId } = req.body;
  const searchQuery = value.trim();
  const regex = new RegExp(searchQuery, "i");

  try {
    if (searchQuery === "") {
      return res.json({
        listUsers: [],
      });
    }
    const users = await User.find({ username: regex });

    if (users.length > 0) {
      const listUsers = users
        .filter((user) => user._id.toString() !== userId)
        .map((user) => {
          return {
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            _id: user._id,
            avatar: user.avatar,
          };
        });
      return res.json({
        listUsers,
      });
    } else {
      return res.json({
        listUsers: [],
      });
    }
  } catch (error) {
    console.log("error");
  }
};
