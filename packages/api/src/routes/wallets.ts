import { FastifyInstance } from "fastify";

// functions
import { getAccountsWallets } from "../functions/wallets";

export async function walletsRoutes(app: FastifyInstance) {
  app.get("/wallets", async (_, res) => {
    try {
      const walletsWithUsdc = await getAccountsWallets();

      res.send(walletsWithUsdc);
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while fetching wallets" });
    }
  });
}
