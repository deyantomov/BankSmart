import express from "express";
import { validateJWT } from "../../middleware/auth/validateJWT.js";
import { getAccount } from "../../middleware/account/getAccount.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: get account data");
});

router.get("/", validateJWT, getAccount, async (req, res) => {
  try {
    res
      .status(200)
      .json({ data: req.accountData });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;