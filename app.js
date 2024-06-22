import "dotenv/config";
import express from "express";
import { VerifyDiscordRequest } from "./utils.js";
import client from "./modules/mongoDB/client.js";
import initializeRouter from "./modules/discordBot/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

initializeRouter(app, client);

app.listen(PORT, async () => {
  await client.connect();
});
