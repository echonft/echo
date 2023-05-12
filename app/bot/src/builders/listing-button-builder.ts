import { listingLink } from '../routing/listing-link'
import { ButtonAction } from '../types/models/button-action'
import { RequestForOffer } from '@echo/model'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

/**
 * Build a "buy listing" button for an offer. This is called when new listings are created
 * @param listing The new listing created
 */
function buildBuyListingButton(listing: RequestForOffer) {
  return (
    new ButtonBuilder()
      .setCustomId(`${ButtonAction.BUY}-${listing.id}`)
      // TODO Add translations
      .setLabel('Trade')
      .setStyle(ButtonStyle.Primary)
  )
}

function buildListingLinkButton(listing: RequestForOffer) {
  return new ButtonBuilder().setLabel('View on Echo').setURL(listingLink(listing)).setStyle(ButtonStyle.Link)
}

export function buildNewListingButtons(listing: RequestForOffer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    buildBuyListingButton(listing),
    buildListingLinkButton(listing)
  )
}
