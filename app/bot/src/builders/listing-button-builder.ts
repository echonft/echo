import { listingLink } from '../routing/listing-link'
import { FirestoreRequestForOfferData } from '@echo/firestore'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export function buildNewListingButtons(listing: FirestoreRequestForOfferData) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(buildListingLinkButton(listing))
}

function buildListingLinkButton(listing: FirestoreRequestForOfferData) {
  return new ButtonBuilder().setLabel('View on Echo').setURL(listingLink(listing)).setStyle(ButtonStyle.Link)
}
