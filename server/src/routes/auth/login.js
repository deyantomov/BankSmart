import express from "express";
import { login } from "../../middleware/auth/login.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: login");
});

router.post("/", login, async (req, res) => {
  if (req.token === "Invalid email or password") {
    return res.status(400).json({ message: req.token });
  }
  
  try {
    res
      .status(200)
      .json({ token: req.token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;