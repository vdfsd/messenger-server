import { Router } from "express";
import { searchUsers } from "../controller/search.js";

const router = new Router();

router.post("/users", searchUsers);

export default router;
