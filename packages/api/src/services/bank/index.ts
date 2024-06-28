import axios from "axios";

// config
import { config } from "../../config";

// helpers
import { withRandomDelay, withRetry } from "../../lib";

export interface AccountType {
  id: number;
  name: string;
}

export interface TransactionType {
  accountId: number;
  id: number;
  amount: number;
}

export async function _getAccounts(): Promise<AccountType[]> {
  const res = await axios.get(config.bankApiBaseURL + "/accounts");
  const responseData = res.data;

  return responseData;
}

export async function _getTransactions(
  accountId: number
): Promise<TransactionType[]> {
  const res = await axios.get(
    config.bankApiBaseURL + `/transactions/${accountId}`
  );
  const responseData = res.data;

  return responseData;
}

export const getAccounts = withRetry(withRandomDelay(_getAccounts, 100), 5, []);
export const getTransactions = withRetry(
  withRandomDelay(_getTransactions, 100),
  5,
  []
);
