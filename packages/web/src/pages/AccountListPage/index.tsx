import React from "react";

// utils
import { getActionWrapper, mergeArraysById, useAsyncEffect } from "../../lib";

// state
import { useComplexState } from "./state";

// queries
import { q_getAccountsWithBalances, q_getAccountsWithWallets } from "./query";

// components
import AccountListTable from "./components/AccountListTable";

export default function AccountsListPage() {
  const { state, setState, setSearchTerm, setCurrentPage, isLoading, isError } =
    useComplexState();

  const wrapUIAction = getActionWrapper(state, setState);

  useAsyncEffect(
    wrapUIAction(async () => {
      const accountsWithBalances = await q_getAccountsWithBalances();
      const accountsWithWallets = await q_getAccountsWithWallets();

      const accounts = mergeArraysById(
        accountsWithBalances,
        accountsWithWallets
      );

      return { accounts };
    }),
    []
  );

  if (isLoading) {
    return <div className="text-md">Loading...</div>;
  }

  if (isError) {
    return <div className="text-md">Something went wrong...</div>;
  }

  const {
    matchingAccounts = [],
    searchTerm,
    currentPage,
    accountsPerPage
  } = state;

  // Get current accounts
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = matchingAccounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-grow mr-2 focus:outline-none"
        />
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <AccountListTable accounts={currentAccounts} />

          <div className="flex justify-center mt-4">
            {Array.from(
              {
                length: Math.ceil(matchingAccounts.length / accountsPerPage)
              },
              (_, i) => i + 1
            ).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`mx-1 px-3 py-1 border font-semibold focus:outline-none ${
                  pageNumber === currentPage
                    ? "bg-gray-600 text-white"
                    : "bg-white"
                }`}>
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
