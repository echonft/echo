import { CommandInterface } from '../types/commands/command-interface'
import { connectSubcommand } from './connect'
import { createListingSubcommand } from './create-listing'
import { SlashCommandBuilder } from 'discord.js'

export const echoCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Choose the command to execute')
    .addSubcommand(connectSubcommand)
    .addSubcommand(createListingSubcommand)
}
