import { listingLink } from '../routing/listing-link'
import { RequestForOffer } from '@echo/model'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export function buildNewListingButtons(listing: RequestForOffer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(buildListingLinkButton(listing))
}

function buildListingLinkButton(listing: RequestForOffer) {
  return new ButtonBuilder().setLabel('View on Echo').setURL(listingLink(listing)).setStyle(ButtonStyle.Link)
}
