import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import usePerformTransaction, {
  transactionType,
} from "../../../hooks/usePerformTransaction";
import { Card, Input, Button, Select } from "react-daisyui";
import withNavigation from "../../../hoc/withNavigation/withNavigation";

function Transaction() {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState(0);
  const { pathname } = useLocation();
  const { accounts } = useSelector((state: RootState) => state.accountData);
  const { token } = useSelector((state: RootState) => state.userData);
  const type = pathname[1]
    .toUpperCase()
    .concat(pathname.slice(2)) as transactionType;

  const performTransaction = usePerformTransaction(type);

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccount(accountId);
  };

  const handleSelectReceiverAccount = (accountId: string) => {
    setReceiverId(accountId);
  }

  const handleUpdateAmount = (newAmount: number) => {
    setAmount(newAmount);
  }

  const handlePerformTransaction = async () => {
    let result;
    
    switch(type) {
      case "Deposit":
      case "Withdraw":
        result = await performTransaction(amount, token, selectedAccount);
        break;
      case "Transfer":
        result = await performTransaction(amount, token, selectedAccount, receiverId);
        break;
    }

    console.log(result);
  };

  if (type === "Transfer") {
    return (
      <div className="flex justify-center-items-center w-full h-full bg-white">
      <Card className="flex flex-col gap-8 justify-center items-center w-full h-full bg-white rounded-md">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-3xl">Select account: </h1>
          <Select
            className="p-4 bg-transparent text-xl"
            onChange={(e) => handleSelectAccount(e.target.value)}
            value={selectedAccount}
          >
            <option value="" disabled>
              --
            </option>
            {accounts.map((account: any, index: number) => {
              return (
                <option key={index} value={account.accountId}>
                  {account.accountId}
                </option>
              );
            })}
          </Select>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-3xl">Enter receiver ID: </h1>
          <Input
            type="string"
            className="text-xl rounded-md border p-2"
            placeholder="Receiver account"
            onChange={(e) => handleSelectReceiverAccount(e.target.value)}
          />
        </div>
        <Input
          className="text-xl rounded-md border p-2 w-1/4"
          placeholder="Amount"
          type="number"
          onChange={(e) => handleUpdateAmount(Number(e.target.value))}
        />
        <Button
          className="text-xl text-white btn btn-primary rounded-md w-1/4"
          onClick={handlePerformTransaction}
        >
          {type}
        </Button>
      </Card>
    </div>
    );
  }

  return (
    <div className="flex justify-center-items-center w-full h-full bg-white">
      <Card className="flex flex-col gap-8 justify-center items-center w-full h-full bg-white rounded-md">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-3xl">Select account: </h1>
          <Select
            className="p-4 bg-transparent text-xl"
            onChange={(e) => handleSelectAccount(e.target.value)}
            value={selectedAccount}
          >
            <option value="" disabled>
              --
            </option>
            {accounts.map((account: any, index: number) => {
              return (
                <option key={index} value={account.accountId}>
                  {account.accountId}
                </option>
              );
            })}
          </Select>
        </div>
        <Input
          type="number"
          className="text-xl rounded-md border p-2 w-1/4"
          placeholder="Amount"
          onChange={(e) => handleUpdateAmount(Number(e.target.value))}
        />
        <Button
          className="text-xl text-white btn btn-primary rounded-md w-1/4"
          onClick={handlePerformTransaction}
        >
          {type}
        </Button>
      </Card>
    </div>
  );
}

export default withNavigation(Transaction);
