export interface AccountType {
  id: number;
  name: string;

  balance: number;
  wallets: any[];
  usdcBalance: number;
}

export interface StateType {
  accounts?: AccountType[];
  matchingAccounts?: AccountType[];

  isLoading: boolean;

  isError: boolean;
  error?: any;

  searchTerm?: string;

  currentPage: number;
  accountsPerPage: number;
}
