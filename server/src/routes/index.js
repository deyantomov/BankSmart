import express from "express";
import RegisterRouter from "./auth/register.js";
import LoginRouter from "./auth/login.js";
import CreateNewAccountRouter from "./account/newAccount.js";

const router = express.Router();

router.use("/register", RegisterRouter);
router.use("/login", LoginRouter);
router.use("/createAccount", CreateNewAccountRouter);

export default router;