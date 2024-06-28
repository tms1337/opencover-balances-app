import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";

import { createApp } from "../../app";

// services
import { getAccounts, getTransactions } from "../../services/bank";

// tested f()
import { getBalance } from ".";

describe("App", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  describe("GET /balances", () => {
    it("should return correct balance for account 1", async () => {
      const balance = await getBalance(1);

      expect(balance).toBeTruthy();
      expect(typeof balance === "number").toBeTruthy();
    });

    it("should return correct balance for account 2", async () => {
      const balance = await getBalance(2);

      expect(balance).toBeTruthy();
      expect(typeof balance === "number").toBeTruthy();
    });

    it("should return correct balance for account 3", async () => {
      const balance = await getBalance(3);

      expect(balance).toBeTruthy();
      expect(typeof balance === "number").toBeTruthy();
    });
  });
});
