import React from "react";

import type { AccountType } from "../../types";

// utils
import { formatBalance } from "../../../../lib";

const AccountListTable = ({ accounts }: { accounts: AccountType[] }) => {
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th scope="col" className="p-2 border">
              ID
            </th>
            <th scope="col" className="p-2 border">
              Name
            </th>
            <th scope="col" className="p-2 border">
              Balance
            </th>
            <th scope="col" className="p-2 border">
              USDC Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr
              key={account.id}
              className="hover:bg-gray-100 text-md cursor-pointer">
              <td className="p-2 border">{account.id}</td>
              <td className="p-2 border">{account.name}</td>
              <td className="p-2 border">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-4 py-1 rounded">
                  {account.balance ? formatBalance(account.balance) : "N/A"}
                </span>
              </td>
              <td className="p-2 border">
                <span className="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-4 py-1 rounded">
                  {account.usdcBalance
                    ? formatBalance(account.usdcBalance)
                    : "N/A"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountListTable;
