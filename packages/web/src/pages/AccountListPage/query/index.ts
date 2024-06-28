import axios from "axios";

import { AccountType } from "../types";

// config
import { config } from "../../../config";

const { apiUrl } = config;

export async function q_getAccountsWithBalances(): Promise<AccountType[]> {
  const details = await axios.get(apiUrl + "/balances");

  return details.data;
}

export async function q_getAccountsWithWallets(): Promise<AccountType[]> {
  const details = await axios.get(apiUrl + "/wallets");

  return details.data;
}
