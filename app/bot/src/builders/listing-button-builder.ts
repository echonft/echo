import { listingLink } from '@echo/bot/routing/listing-link'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export function buildNewListingButtons(username: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(buildListingLinkButton(username))
}

function buildListingLinkButton(username: string) {
  return new ButtonBuilder().setLabel('View on Echo').setURL(listingLink(username)).setStyle(ButtonStyle.Link)
}
