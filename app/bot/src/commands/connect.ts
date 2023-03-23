import { loginLink } from '@echo/api'
import { CommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'

/**
 * Connect command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const connectSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('connect').setDescription('Connect to the bot via Discord and Wallet')

export function executeConnect(interaction: CommandInteraction) {
  return interaction.reply({
    content: loginLink,
    ephemeral: true
  })
}
