import Messages from "../model/Message.js";
import User from "../model/User.js";

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added successfully" });
    } else {
      console.log("error");
      return res.json({ msg: "Field to add message to the  database" });
    }
  } catch (ex) {
    console.log(ex);
    next();
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    console.log("err");
  }
};

export const getChats = async (req, res, next) => {
  try {
    const { from } = req.body;

    const chats = await Messages.find({
      users: {
        $all: [from],
      },
    }).sort({ updatedAt: -1 });

    const listIdUsersArray = chats.map((u) => {
      const userTo = u.users.filter((u) => {
        return u.toString() !== from;
      });
      return userTo;
    });
    const listIdUsers = listIdUsersArray.map((id) => id[0]);

    const uniqueIdSet = keepFirstUniqueObjectIds(listIdUsers);
    const uniqueId = Array.from(uniqueIdSet);

    const users = await User.find({ _id: { $in: uniqueId } }).select(
      "-password"
    );

    const sortedUsers = users.sort((userA, userB) => {
      const indexA = uniqueId.findIndex((id) => id.equals(userA._id));
      const indexB = uniqueId.findIndex((id) => id.equals(userB._id));
      return indexA - indexB;
    });

    return res.json(sortedUsers);
  } catch (error) {
    console.log("err");
  }
};

function keepFirstUniqueObjectIds(objectIds) {
  const uniqueIds = new Set();
  const result = [];

  for (const objectId of objectIds) {
    const stringId = objectId.toString();

    if (!uniqueIds.has(stringId)) {
      uniqueIds.add(stringId);
      result.push(objectId);
    }
  }

  return result;
}
