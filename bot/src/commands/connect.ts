import { getLoginLink } from '@echo/discord/routing/routes'
import { CommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'

/**
 * Connect command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const connectSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('connect').setDescription('Connect to the bot via Discord and Wallet')

export async function executeConnect(interaction: CommandInteraction) {
  // TODO Probably dont need to redirect to discord right away, to define
  await interaction.reply({
    content: getLoginLink(),
    ephemeral: true
  })
}
