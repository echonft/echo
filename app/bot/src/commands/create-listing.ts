import { createListingLink } from '@echo/discord'
import { CommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'

/**
 * Create listing command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const createListingSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('create').setDescription('Create a listing')

export function executeCreateListing(interaction: CommandInteraction) {
  return interaction.reply({
    content: createListingLink(interaction.guildId ?? ''),
    ephemeral: true
  })
}
