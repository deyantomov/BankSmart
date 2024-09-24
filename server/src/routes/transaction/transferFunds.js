import express from "express";
import { validateJWT } from "../../middleware/auth/validateJWT.js";
import { transfer } from "../../middleware/transaction/transferFunds.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: transfer funds");
});

router.post("/", validateJWT, transfer, async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: `Transfer complete` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;