import { connectSubcommand } from '@echo/bot/commands/connect'
import { createListingSubcommand } from '@echo/bot/commands/create-listing'
import type { CommandInterface } from '@echo/bot/types/commands/command-interface'
import { SlashCommandBuilder } from 'discord.js'

export const echoCommand: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Choose the command to execute')
    .addSubcommand(connectSubcommand)
    .addSubcommand(createListingSubcommand)
}
