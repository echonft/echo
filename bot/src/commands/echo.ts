import { connectSubcommand } from './connect'
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'

interface CommandInterface {
  data: SlashCommandSubcommandsOnlyBuilder
}

export const echoCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Choose the command to execute')
    .addSubcommand(connectSubcommand)
}
