import axios from "axios";

// config
import { config } from "../../config";

// utils
import { withRandomDelay, withRetry } from "../../lib";

export interface WalletType {
  chainId: number;
  address: string;

  usdcBalance?: number;
}

export async function _getWallets(accountId: number): Promise<WalletType[]> {
  const res = await axios.get(
    `https://bankapi.opencover.com/wallets/${accountId}`
  );
  const responseData = res.data.map(
    (x: WalletType): WalletType => ({ ...x, usdcBalance: 1.0 })
  );

  return responseData || [];
}

const _getUsdcTokenBalance = async (wallet: string) => {
  const url = config.alchemyApiBaseURL + "/" + config.security.alchemyKey;
  const contractAddress = config.usdcContractAddress;

  const data = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    params: [`${wallet}`, [`${contractAddress}`]],
    id: 1,
  });

  const httpCallConfig = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(httpCallConfig);
  const balanceHex = response.data.result.tokenBalances[0].tokenBalance;
  const balance = parseInt(balanceHex, 16) / 10 ** 6; // USDC has 6 decimal places

  return balance;
};

export const getWallets = withRetry(withRandomDelay(_getWallets, 100), 5, []);
export const getUsdcTokenBalance = withRetry(
  withRandomDelay(_getUsdcTokenBalance, 100),
  5,
  []
);
