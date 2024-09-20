import express from "express";
import RegisterRouter from "./auth/register.js";
import LoginRouter from "./auth/login.js";

const router = express.Router();

router.use("/register", RegisterRouter);
router.use("/login", LoginRouter);

export default router;