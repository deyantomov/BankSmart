import express from "express";
import RegisterRouter from "./auth/register.js";
import LoginRouter from "./auth/login.js";
import CreateNewAccountRouter from "./account/newAccount.js";
import TransferFundsRouter from "./transaction/transferFunds.js";
import DepositRouter from "./transaction/depositFunds.js";
import WithdrawRouter from "./transaction/withdrawFunds.js";

const router = express.Router();

router.use("/register", RegisterRouter);
router.use("/login", LoginRouter);
router.use("/createAccount", CreateNewAccountRouter);
router.use("/transferFunds", TransferFundsRouter);
router.use("/depositFunds", DepositRouter);
router.use("/withdrawFunds", WithdrawRouter);

export default router;
