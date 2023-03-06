import { ButtonAction } from '../types/models/button-action'
import { linkForListing } from '../utils/listing'
import { Offer } from '@echo/model'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

/**
 * Build a "buy listing" button for an offer. This is called when new listings are created
 * @param listing The new listing created
 */
function buildBuyListingButton(listing: Offer) {
  return (
    new ButtonBuilder()
      .setCustomId(`${ButtonAction.BUY}-${listing.id}`)
      // TODO Add translations
      .setLabel('Trade')
      .setStyle(ButtonStyle.Primary)
  )
}

function buildListingLinkButton(listing: Offer) {
  return new ButtonBuilder().setLabel('View on Echo').setURL(linkForListing(listing)).setStyle(ButtonStyle.Link)
}

export function buildNewListingButtons(listing: Offer) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    buildBuyListingButton(listing),
    buildListingLinkButton(listing)
  )
}
