import { listingLink } from '../routing/listing-link'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export function buildNewListingButtons(listingId: string, discordGuildId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(buildListingLinkButton(listingId, discordGuildId))
}

function buildListingLinkButton(listingId: string, discordGuildId: string) {
  return new ButtonBuilder()
    .setLabel('View on Echo')
    .setURL(listingLink(listingId, discordGuildId))
    .setStyle(ButtonStyle.Link)
}
