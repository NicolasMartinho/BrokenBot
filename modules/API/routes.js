import { getAllDocument } from "../mongoDB/methods/getAllDocument.js";
import { getOneRandomCard } from "../mongoDB/methods/getOneRandomCard.js";

const DATABASE = "brokenBot";
const CARD_COLLECTION = "card";

export default (router, client) => {
  router.get("/db", async (req, res) => {
    const data = await getAllDocument(client, {
      database: DATABASE,
      collection: CARD_COLLECTION,
    });
    return res.send(data);
  });

  router.get("/card/:rarity", async (req, res) => {
    const { rarity } = req.params;
    const data = await getOneRandomCard(client, {
      database: DATABASE,
      collection: CARD_COLLECTION,
    }, {
      rarity
    });
    return res.send(data);
  });
};
