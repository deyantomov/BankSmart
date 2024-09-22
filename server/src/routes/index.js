import express from "express";
import RegisterRouter from "./auth/register.js";
import LoginRouter from "./auth/login.js";
import CreateNewAccountRouter from "./account/newAccount.js";
import TransferFundsRouter from "./account/transferFunds.js";
import DepositRouter from "./account/depositFunds.js";
import WithdrawRouter from "./account/withdrawFunds.js";

const router = express.Router();

router.use("/register", RegisterRouter);
router.use("/login", LoginRouter);
router.use("/createAccount", CreateNewAccountRouter);
router.use("/transferFunds", TransferFundsRouter);
router.use("/depositFunds", DepositRouter);
router.use("/withdrawFunds", WithdrawRouter);

export default router;
