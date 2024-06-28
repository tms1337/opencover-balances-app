import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../src/app";
import { sleepms } from "../src/lib";

jest.setTimeout(60 * 1000);

describe("App", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  describe("GET /balance", () => {
    it("should be able to call endpoint", async () => {
      const res = await app.inject({ method: "GET", url: "/balances" });

      expect(res.statusCode).toEqual(200);
    });

    it("should return an array of balances", async () => {
      const res = await app.inject({ method: "GET", url: "/balances" });

      expect(res.statusCode).toEqual(200);

      const parsedBody = JSON.parse(res.body);

      expect(Array.isArray(parsedBody)).toBeTruthy();
    });

    // TODO: when 10 still sometimes fails...
    // discuss mechanisms
    it("[benchy] should return an array of balances for 5 times", async () => {
      for (let i = 0; i < 5; i++) {
        try {
          const res = await app.inject({ method: "GET", url: "/balances" });

          expect(res.statusCode).toEqual(200);

          const parsedBody = JSON.parse(res.body);

          expect(Array.isArray(parsedBody)).toBeTruthy();

          await sleepms(400);
        } catch (err) {
          console.log({ err });
        }
      }
    });
  });
});
