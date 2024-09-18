import express from "express";
import RegisterRouter from "./auth/register.js";

const router = express.Router();

router.use("/register", RegisterRouter);

export default router;