import { FastifyInstance } from "fastify";

import { getAccountsBalances } from "../functions/balances";

export async function balancesRoutes(app: FastifyInstance) {
  app.get("/balances", async (_, res) => {
    try {
      const balances = await getAccountsBalances();

      res.send(balances);
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while fetching balances" });
    }
  });
}
