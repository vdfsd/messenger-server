import { Router } from "express";
import { getMessages, addMessage, getChats } from "../controller/messages.js";

const router = new Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.post("/getchats", getChats);

export default router;
