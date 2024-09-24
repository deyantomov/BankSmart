import express from "express";
import { createAccount } from "../../middleware/account/createAccount.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: create new account");
});

router.post("/", createAccount, async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: `Account ${req.accountId} successfully created` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;