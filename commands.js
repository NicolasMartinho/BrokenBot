import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const TIRAGE_COMMAND = {
  name: 'tirage',
  description: 'Basic command',
  type: 1,
};


const ALL_COMMANDS = [TIRAGE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);