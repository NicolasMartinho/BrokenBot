import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
} from "./utils.js";
import { getShuffledOptions, getResult } from "./game.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "tirage" command
    if (name === "tirage") {
  
      const RARITY = {
        NORMAL: { name: "commune", rollMin: 0, rollMax: 90 },
        RARE: { name: "rare", rollMin: 90, rollMax: 99 },
        EPIC: { name: "épique", rollMin: 99, rollMax: 99.9 },
        LEGENDARY: { name: "légendaire", rollMin: 99.9, rollMax: 100 },
      };

      const IMAGES = [
        {name : "Neshka", rarity: RARITY.RARE},
        {name : "Dragubot", rarity: RARITY.NORMAL},
        {name : "Snaky", rarity: RARITY.EPIC},
        {name : "Ouki", rarity: RARITY.LEGENDARY},
      ]

      const roll = Math.random()*100

      let imagesDansLeRoll = IMAGES.filter(image => image.rollMin < roll && image.rollMax >= roll)

      let imageTirée = imagesDansLeRoll[Math.floor(Math.random()* imagesDansLeRoll.length)]
      
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
