import { describe, it, expect } from "@jest/globals";
import { FastifyInstance } from "fastify";
import { createApp } from "../app";

// tested f
import { withFailure } from ".";

describe("withFail", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    app.close();
  });

  it("fails 3 times when spec", async () => {
    const _fn = async () => {
      return 1337;
    };
    const fn = withFailure(_fn, 3);

    for (let i = 0; i < 3; i++) {
      try {
        await fn();
        expect(1).toEqual(2);
      } catch (_) {}
    }

    const result = await fn();

    expect(result).toEqual(1337);
  });

  it("fails 10 times when spec", async () => {
    const _fn = async () => {
      return 1337;
    };
    const fn = withFailure(_fn, 10);

    for (let i = 0; i < 10; i++) {
      try {
        await fn();
        expect(1).toEqual(2);
      } catch (_) {}
    }

    const result = await fn();

    expect(result).toEqual(1337);
  });
});
