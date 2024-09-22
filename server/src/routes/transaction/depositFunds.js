import express from "express";
import { deposit } from "../../middleware/transaction/depositFunds.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: deposit funds");
});

router.post("/", deposit, async (req, res) => {
  try {
    res.status(200).json({ message: "Deposit complete", amt: req.amt });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;
