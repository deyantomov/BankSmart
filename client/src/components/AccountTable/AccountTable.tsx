import { Table } from "react-daisyui";

interface Account {
  accountId: string;
  type: string;
  currency: string;
  balance: number;
  createdAt: string;
}

interface AccountTableProps {
  accounts: Array<Account>;
}

export default function AccountTable({ accounts }: AccountTableProps) {
  return (
    <div className="w-full h-full text-xs sm:text-sm md:text-lg xl:text-xl my-4 mb-9 sm:my-8">
      <Table className="w-full h-full bg-white">
        <Table.Head>
          <span></span>
          <span>ID</span>
          <span>Type</span>
          <span>Currency</span>
          <span>Balance</span>
          <span>Created At</span>
        </Table.Head>
        <Table.Body>
          {accounts.map((account: Account, index: number) => (
            <Table.Row
              key={index}
              className={`${index % 2 !== 0 ? "bg-slate-200" : ""}`}
            >
              <span>{index + 1}</span>
              <span>{account.accountId}</span>
              <span>
                {account.type[0].toUpperCase().concat(account.type.slice(1))}
              </span>
              <span>{account.currency}</span>
              <span>{account.balance}</span>
              <span>{new Date(account.createdAt).toLocaleDateString()}</span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
