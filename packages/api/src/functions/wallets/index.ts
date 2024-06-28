// services
import { getAccounts } from "../../services/bank";
import { getWallets, getUsdcTokenBalance } from "../../services/eth";

export async function getAccountsWallets() {
  const accounts = await getAccounts();

  const accountsWithWallets = await Promise.all(
    accounts.map(async (x: any) => {
      const wallets = await getWallets(x.id);
      return { ...x, wallets };
    })
  );

  const walletsWithUsdc = await Promise.all(
    accountsWithWallets.map(async (x: any) => {
      if (x.wallets.length > 0) {
        return {
          ...x,
          usdcBalance: await getUsdcTokenBalance(x.wallets[0].address),
        };
      } else {
        return x;
      }
    })
  );

  return walletsWithUsdc;
}
