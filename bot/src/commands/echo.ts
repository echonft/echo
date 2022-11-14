import { connectSubcommand } from '@commands/connect'
import { SlashCommandBuilder } from 'discord.js'

export const echoCommand = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Choose the command to execute')
    .addSubcommand(connectSubcommand)
}
