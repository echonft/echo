import { SlashCommandBuilder } from 'discord.js'
import { CommandInterface } from '../types/commands/command-interface'
import { connectSubcommand } from './connect'
import { createOfferSubcommand } from './create-offer'

export const echoCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Choose the command to execute')
    .addSubcommand(connectSubcommand)
    .addSubcommand(createOfferSubcommand)
}
