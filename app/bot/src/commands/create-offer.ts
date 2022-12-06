import { createOfferLink } from '@echo/discord'
import { CommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'

/**
 * Create offer command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const createOfferSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('create').setDescription('Create an offer')

export function executeCreateOffer(interaction: CommandInteraction) {
  return interaction.reply({
    content: createOfferLink(interaction.guildId ?? ''),
    ephemeral: true
  })
}
