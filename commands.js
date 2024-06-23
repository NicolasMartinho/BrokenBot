import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const TIRAGE_COMMAND = {
  name: 'tirage',
  description: 'Tire une carte au hasard',
  type: 1,
};

const COLLECTION_COMMAND = {
  name: 'collection',
  description: 'Affiche la collection de cartes',
  type: 1,
};


const ALL_COMMANDS = [TIRAGE_COMMAND, COLLECTION_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);