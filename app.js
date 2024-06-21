import "dotenv/config";
import express from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";
import { VerifyDiscordRequest } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));



app.post("/interactions", async function (req, res) {
  const { type, id, data } = req.body;


  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === "tirage") {
      const RARITY = {
        NORMAL: { name: "commune", rollMin: 0, rollMax: 50 },
        RARE: { name: "rare", rollMin: 50, rollMax: 90 },
        EPIC: { name: "épique", rollMin: 90, rollMax: 99 },
        LEGENDARY: { name: "légendaire", rollMin: 99, rollMax: 100 },
      };

      const IMAGES = [
        { name: "Neshka", rarity: RARITY.RARE },
        { name: "Dragubot", rarity: RARITY.NORMAL },
        { name: "Snaky", rarity: RARITY.EPIC },
        { name: "Ouki", rarity: RARITY.LEGENDARY },
      ];

      const roll = Math.random() * 100;

      let imagesDansLeRoll = IMAGES.filter(
        (image) => image.rarity.rollMin < roll && image.rarity.rollMax >= roll
      );

      let imageTirée =
        imagesDansLeRoll[Math.floor(Math.random() * imagesDansLeRoll.length)];

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `tu as tiré un ${imageTirée.name} de qualité ${imageTirée.rarity.name}`,
        },
      });
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
