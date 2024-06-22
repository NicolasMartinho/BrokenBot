import { InteractionType, InteractionResponseType } from "discord-interactions";
import { getOneRandomCard } from "../mongoDB/methods/getOneRandomCard.js";
import { upsertOneCardToUser } from "../mongoDB/methods/upsertOneCardToUser.js";

const DATABASE = "brokenBot";
const CARD_COLLECTION = "card";
const USER_COLLECTION = "user";

export default (router, client) => {
  router.post("/interactions", async function (req, res) {
    const { type, member, data } = req.body;

    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      switch (name) {
        case "tirage": {
          const RARITY = [
            { id: 1, name: "Commune", color: 0, rollMin: 0, rollMax: 50 },
            { id: 2, name: "Rare", color: 3447003, rollMin: 50, rollMax: 90 },
            {
              id: 3,
              name: "Épique",
              color: 10181046,
              rollMin: 90,
              rollMax: 99,
            },
            {
              id: 4,
              name: "Légendaire",
              color: 15105570,
              rollMin: 99,
              rollMax: 100,
            },
          ];

          const rollForRarity = Math.random() * 100;

          let rarityRolled = RARITY.find(
            (rarity) =>
              rarity.rollMin < rollForRarity && rarity.rollMax >= rollForRarity
          );

          const data = await getOneRandomCard(
            client,
            {
              database: DATABASE,
              collection: CARD_COLLECTION,
            },
            {
              rarity: rarityRolled.id,
            }
          );

          await upsertOneCardToUser(
            client,
            { database: DATABASE, collection: USER_COLLECTION },
            { user: member.user, card: data }
          );

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: "",
              embeds: [
                {
                  title: `${data.name}`,
                  image: { url: data.image },
                  footer: { text: data.comment },
                  color: rarityRolled.color,
                  author: { name: rarityRolled.name },
                },
              ],
            },
          });
        }
      }
    }
  });
};
