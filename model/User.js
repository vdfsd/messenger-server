import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

export default mongoose.model("User", UserSchema);
