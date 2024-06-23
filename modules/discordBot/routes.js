import { InteractionType, InteractionResponseType } from "discord-interactions";
import { getOneRandomCard } from "../mongoDB/methods/getOneRandomCard.js";
import { upsertOneCardToUser } from "../mongoDB/methods/upsertOneCardToUser.js";
import { getAllCardsForUser } from "../mongoDB/methods/getAllCardsForUser.js";

const DATABASE = "brokenBot";
const CARD_COLLECTION = "card";
const USER_COLLECTION = "user";

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

export default (router, client) => {
  router.post("/interactions", async function (req, res) {
    const { type, member, data } = req.body;

    switch (type) {
      case InteractionType.PING: {
        return res.send({ type: InteractionResponseType.PONG });
      }

      case InteractionType.APPLICATION_COMMAND: {
        const { name } = data;

        switch (name) {
          case "tirage": {
            const rollForRarity = Math.random() * 100;

            let rarityRolled = RARITY.find(
              (rarity) =>
                rarity.rollMin < rollForRarity &&
                rarity.rollMax >= rollForRarity
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
          case "collection": {
            const cards = await getAllCardsForUser(
              client,
              {
                database: DATABASE,
                collection: USER_COLLECTION,
              },
              {
                user: member.user,
              }
            );

            let indexOfCard = 0;
            let card = cards[indexOfCard];
            let rarityOfCard = RARITY.find(
              (rarity) => rarity.id === card.rarity
            );

            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: "",
                embeds: [
                  {
                    title: `${card.name}`,
                    image: { url: card.image },
                    footer: { text: card.comment },
                    color: rarityOfCard.color,
                    author: { name: rarityOfCard.name },
                  },
                ],
                components: [
                  {
                    type: 1,
                    components: [
                      {
                        type: 2,
                        label: "Previous",
                        style: 1,
                        custom_id: "previous",
                        disabled: true,
                      },
                      {
                        type: 2,
                        label: "Next",
                        style: 1,
                        custom_id: +indexOfCard + 1,
                        disabled: +indexOfCard + 1 === cards.length,
                      },
                    ],
                  },
                ],
              },
            });
          }
        }
      }

      case InteractionType.MESSAGE_COMPONENT: {
        const { custom_id } = data;

        console.log(req.body)

        const cards = await getAllCardsForUser(
          client,
          {
            database: DATABASE,
            collection: USER_COLLECTION,
          },
          {
            user: member.user,
          }
        );

        let indexOfCards = custom_id;
        let card = cards[+indexOfCards];
        let rarityOfCard = RARITY.find((rarity) => rarity.id === card.rarity);

        return res.send({
          type: InteractionResponseType.UPDATE_MESSAGE,
          data: {
            content: "",
            embeds: [
              {
                title: `${card.name}`,
                image: { url: card.image },
                footer: { text: card.comment },
                color: rarityOfCard.color,
                author: { name: rarityOfCard.name },
              },
            ],
            components: [
              {
                type: 1,
                components: [
                  {
                    type: 2,
                    label: "Previous",
                    style: 1,
                    custom_id: +custom_id - 1,
                    disabled: +custom_id === 0,
                  },
                  {
                    type: 2,
                    label: "Next",
                    style: 1,
                    custom_id: +custom_id + 1,
                    disabled: +custom_id + 1 === cards.length,
                  },
                ],
              },
            ],
          },
        });
      }
    }
  });
};
