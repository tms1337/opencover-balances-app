import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../../app";

import { getWallets } from ".";

jest.setTimeout(30 * 1000);

describe("App", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  describe("GET /wallets", () => {
    it("should return list of wallets for account 10", async () => {
      const wallets = await getWallets(10);

      expect(Array.isArray(wallets)).toBeTruthy();
      expect(wallets?.[0].chainId).toBeTruthy();
      expect(wallets?.[0].address).toBeTruthy();
    });

    it("should return empty list of wallets for account 13371337", async () => {
      const wallets = await getWallets(13371337);

      expect(Array.isArray(wallets)).toBeTruthy();
      expect(wallets.length).toEqual(0);
    });
  });
});
