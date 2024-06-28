import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

// routes
import { balancesRoutes } from "./routes/balances";
import { walletsRoutes } from "./routes/wallets";

export function createApp(): FastifyInstance {
  const app = fastify();

  app.register(cors);

  app.get("/ping", async (req, res) => {
    res.send("pong\n");
  });

  /**
   * Routes
   */
  app.register(balancesRoutes);
  app.register(walletsRoutes);

  return app;
}
