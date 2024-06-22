//import modules
import express from "express";
import client from "../mongoDB/client.js";
import initializeRouter from "./routes.js"

const app = express();
app.use(express.json())
const PORT = 3001;

initializeRouter(app, client);

app.listen(PORT, async () => {
  await client.connect();
});


