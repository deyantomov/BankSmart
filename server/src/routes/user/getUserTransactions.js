import express from "express";
import { validateJWT } from "../../middleware/auth/validateJWT.js";
import { getUserTransactions } from "../../middleware/user/getUserTransactions.js";

const router = express.Router();

router.get("/test", (req, res) => {
  return res.status(200).json("test ok: get user transactions");
});

router.get("/", validateJWT, getUserTransactions, async (req, res) => {
  try {
    return res
      .status(200)
      .json({ data: req.transactions });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;