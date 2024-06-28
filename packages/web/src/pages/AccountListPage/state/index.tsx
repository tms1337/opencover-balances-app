import { useReducer } from "react";

// types
import { StateType } from "../types";

type ActionType =
  | { type: "SET_STATE"; payload: Partial<StateType> }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: number };

const initialState: StateType = {
  isLoading: true,
  isError: false,
  accounts: [],
  matchingAccounts: [],
  searchTerm: "",
  currentPage: 1,
  accountsPerPage: 15
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_STATE": {
      return {
        ...state,
        ...action.payload,
        matchingAccounts: action.payload.accounts || state.accounts,
        accountsPerPage: state.accountsPerPage
      };
    }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, isError: action.payload };
    case "SET_SEARCH_TERM": {
      const matchingAccounts =
        action.payload.length > 0 && state.accounts
          ? state.accounts.filter(account =>
              account.name.toLowerCase().includes(action.payload.toLowerCase())
            )
          : state.accounts;

      return {
        ...state,
        searchTerm: action.payload,
        matchingAccounts,
        currentPage: 1
      };
    }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      throw new Error("Unknown action type");
  }
}

export function useComplexState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = (payload: Partial<StateType>) => {
    dispatch({ type: "SET_STATE", payload });
  };

  const setLoading = (payload: boolean) => {
    dispatch({ type: "SET_LOADING", payload });
  };

  const setError = (payload: boolean) => {
    dispatch({ type: "SET_ERROR", payload });
  };

  const setSearchTerm = (payload: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload });
  };

  const setCurrentPage = (payload: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload });
  };

  return {
    state,
    setState,

    accounts: state.matchingAccounts,

    isError: state.isError,
    error: state.error,
    setError,

    isLoading: state.isLoading,
    setLoading,

    searchTerm: state.searchTerm,
    setSearchTerm,

    currentPage: state.currentPage,
    setCurrentPage,

    accountsPerPage: state.accountsPerPage
  };
}
