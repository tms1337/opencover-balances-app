import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../../app";

import { getUsdcTokenBalance, getWallets } from ".";

jest.setTimeout(30 * 1000);

describe("App", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  describe("GET USDC token balance", () => {
    it("should return number for fixed wallet", async () => {
      const usdcBalance = await getUsdcTokenBalance(
        "0x879b72e6de1db2908502298c7c34ac6f33729863"
      );

      expect(typeof usdcBalance == "number").toBeTruthy();
    });
  });
});
