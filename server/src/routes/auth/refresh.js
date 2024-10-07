import express from "express";
import { refreshJWT } from "../../middleware/auth/refreshJWT.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: refresh token");
});

router.get("/", refreshJWT, async (req, res) => {
  const { accessToken } = req;

  try {
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
