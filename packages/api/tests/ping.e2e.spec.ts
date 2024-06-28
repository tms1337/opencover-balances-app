import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../src/app";

describe("App", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  describe("GET /ping", () => {
    it("should return pong", async () => {
      const res = await app.inject({ method: "GET", url: "/ping" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual("pong\n");
    });
  });
});
