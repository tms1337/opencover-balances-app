import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../../app";

import { getAccounts, getTransactions } from ".";

describe("App", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  describe("GET /accounts and /transactions", () => {
    it("should return list of accounts", async () => {
      const accounts = await getAccounts();

      expect(Array.isArray(accounts)).toBeTruthy();
      expect(accounts?.[0].name).toBeTruthy();
    });

    it("should return list of tx for account 1", async () => {
      const txs = await getTransactions(1);

      expect(Array.isArray(txs)).toBeTruthy();
      expect(txs?.[0].amount).toBeTruthy();
    });
  });
});
