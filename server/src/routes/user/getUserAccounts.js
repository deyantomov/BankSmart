import express from "express";
import { validateJWT } from "../../middleware/auth/validateJWT.js";
import { getUserAccounts } from "../../middleware/user/getUserAccounts.js";

const router = express.Router();

router.get("/test", (req, res) => {
  return res.status(200).json("test ok: get user accounts");
});

router.get("/", validateJWT, getUserAccounts, async (req, res) => {
  try {
    return res
      .status(200)
      .json({ data: req.accountData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;