import express from "express";
import { register } from "../../middleware/auth/register.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: register");
});

router.post("/", register, async (req, res) => {
  const { firstName, lastName } = req;
  
  try {
    res
      .status(201)
      .json({ message: `User ${firstName} ${lastName} created successfully` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;
