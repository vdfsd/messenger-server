import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import searchRoute from "./routes/search.js";
import messagesRoute from "./routes/messages.js";
import { Server } from "socket.io";
import Messages from "./model/Message.js";
import User from "./model/User.js";

export const app = express();
dotenv.config();

const PORT = process.env.PORT || 4001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

app.use(cors());
app.use(express.json());
app.use(express.static("images"));

app.use("/api/auth", authRoute);
app.use("/api", searchRoute);
app.use("/api/messages", messagesRoute);

app.get("/images/:imageName", (req, res) => {
  const { imageName } = req.params;
  res.sendFile(imageName, { root: "/images" });
});

const server = app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    // origin: "https://messenger-client-ruby.vercel.app/",
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("connect user");
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log("online user");
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", async (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    const existedChat = await Messages.findOne({
      users: {
        $all: [data.from, data.to],
      },
    });
    console.log(existedChat);
    const userFrom = await User.findById(data.from);

    if (sendUserSocket) {
      const user = existedChat !== null ? null : userFrom;
      socket
        .to(sendUserSocket)
        .emit("msg-recieve", { data: data.message, user });
    }
  });
});

async function startServer() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@messenger.t2grqng.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    return server;
  } catch (error) {
    console.log(`some error`);
  }
}
startServer();
