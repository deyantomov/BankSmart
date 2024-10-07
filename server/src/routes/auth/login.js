import express from "express";
import { login } from "../../middleware/auth/login.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: login");
});

router.post("/", login, async (req, res) => {
  const { accessToken, refreshToken } = req;

  try {
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
