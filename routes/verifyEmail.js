import { Router } from "express";
import { verifyEmail } from "../controller/verifyEmail.js";

const router = new Router();

router.post("/verify-email", verifyEmail);

export default router;
