import express from "express";
import { validateJWT } from "../../middleware/auth/validateJWT.js";
import { getUser } from "../../middleware/user/getUser.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test ok: get user data");
});

router.get("/", validateJWT, getUser, async (req, res) => {  
  try {
    res
      .status(200)
      .json({ data: req.userData });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

export default router;