import { getAllDocument } from "../mongoDB/methods/getAllDocument.js";
import { getOneRandomCard } from "../mongoDB/methods/getOneRandomCard.js";
import { addOneDocument } from "../mongoDB/methods/addOneDocument.js"

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


  router.post("/db", (req, res) => {
    console.log("body is :")
    console.log(req)
    const db = {
      database: DATABASE,
      collection : CARD_COLLECTION
    }
    const body = req.body
    const data = addOneDocument(client, db, body)
    res.status(201)
    return res.send(data)
  })
};
