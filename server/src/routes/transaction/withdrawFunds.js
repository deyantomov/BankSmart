import express from "express";
import { validateJWT } from "../../middleware/auth/validateJWT.js";
import { withdraw } from "../../middleware/transaction/withdrawFunds.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: withdraw funds");
});

router.post("/", validateJWT, withdraw, async (req, res) => {
  try {
    res.status(200).json({ message: "Withdraw complete", amt: req.amt });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;
