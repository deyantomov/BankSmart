import express from "express";
import bcrypt from "bcrypt";
import User from "../../models/User.js";
import { generateToken } from "../../lib/token.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await User.findOne({ username });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const token = generateToken();
        res.status(200).send({ token });
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;