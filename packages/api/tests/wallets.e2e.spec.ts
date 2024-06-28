import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../src/app";
import { sleepms } from "../src/lib";

jest.setTimeout(120 * 1000);

describe("App", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  describe("GET /wallets", () => {
    it("should be able to call endpoint /wallets", async () => {
      const res = await app.inject({ method: "GET", url: "/wallets" });
      const accounts = JSON.parse(res.body);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(accounts)).toBeTruthy();
    });

    it("should return an array of accounts with wallets", async () => {
      const res = await app.inject({ method: "GET", url: "/wallets" });
      const accounts = JSON.parse(res.body);

      expect(res.statusCode).toEqual(200);

      expect(Array.isArray(accounts)).toBeTruthy();
      expect(Array.isArray(accounts?.[0].wallets)).toBeTruthy();
    });

    it("[benchy] should return an array of wallets for 5 times", async () => {
      for (let i = 0; i < 25; i++) {
        const res = await app.inject({
          method: "GET",
          url: "/wallets",
        });
        const accounts = JSON.parse(res.body);

        expect(Array.isArray(accounts)).toBeTruthy();
        expect(Array.isArray(accounts?.[i].wallets)).toBeTruthy();

        if (accounts?.[i].wallets?.[0]) {
          expect(
            typeof accounts?.[i].wallets?.[0].usdcBalance == "number"
          ).toBeTruthy();
        }

        await sleepms(200);
      }
    });
  });
});
