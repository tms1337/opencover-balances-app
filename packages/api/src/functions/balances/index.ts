import {
  TransactionType,
  getAccounts,
  getTransactions,
} from "../../services/bank";

export async function getBalance(accountId: number): Promise<number> {
  const txs = await getTransactions(accountId);

  const balance = txs
    .map((x: TransactionType) => x.amount)
    .reduce((partialSum: number, a: number) => partialSum + a, 0);

  return balance;
}

export async function getAccountsBalances() {
  const accounts = await getAccounts();

  const balances = await Promise.all(
    accounts.map(async (x: any) => {
      const balance = await getBalance(x.id);
      return { ...x, balance };
    })
  );

  return balances;
}
