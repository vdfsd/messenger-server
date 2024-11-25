import { Router } from "express";
import { verifyEmail, isMFAEnabled } from "../controller/verifyEmail.js";

const router = new Router();

router.post("/verify-email", verifyEmail);
router.post("/mfa-enabled", isMFAEnabled);

export default router;
