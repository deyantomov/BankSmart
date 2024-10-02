import express from "express";
import RegisterRouter from "./auth/register.js";
import LoginRouter from "./auth/login.js";
import GetUserDataRouter from "./user/getUserData.js";
import GetUserAccountsRouter from "./user/getUserAccounts.js"
import GetUserTransactionsRouter from "./user/getUserTransactions.js";
import CreateNewAccountRouter from "./account/createAccount.js";
import GetAccountDataRouter from "./account/getAccountData.js";
import TransferFundsRouter from "./transaction/transferFunds.js";
import DepositRouter from "./transaction/depositFunds.js";
import WithdrawRouter from "./transaction/withdrawFunds.js";

const router = express.Router();

router.use("/register", RegisterRouter);
router.use("/login", LoginRouter);
router.use("/getUserData", GetUserDataRouter);
router.use("/getUserAccounts", GetUserAccountsRouter); 
router.use("/getUserTransactions", GetUserTransactionsRouter); 
router.use("/createAccount", CreateNewAccountRouter);
router.use("/getAccountData", GetAccountDataRouter); 
router.use("/transferFunds", TransferFundsRouter);
router.use("/depositFunds", DepositRouter);
router.use("/withdrawFunds", WithdrawRouter);

export default router;
