import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../../app";

import { _getTransactions, getAccounts, getTransactions } from ".";
import { withRandomDelay, withRetry } from "../../lib";

jest.setTimeout(30 * 1000);

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

    // as discussed on a call
    it("should should handle fail gracefuly and retry", async () => {
      const fnn = withRetry(withRandomDelay(_getTransactions, 500), 5, []);
      const txs = await fnn(1);

      expect(Array.isArray(txs)).toBeTruthy();
      expect(txs?.[0].amount).toBeTruthy();
    });

    it("[benchy] should return list of tx for account first 5 accs", async () => {
      for (let i = 0; i < 5; i++) {
        const txs = await getTransactions(i);

        expect(Array.isArray(txs)).toBeTruthy();
        expect(txs?.[0].amount).toBeTruthy();
      }
    });
  });
});
