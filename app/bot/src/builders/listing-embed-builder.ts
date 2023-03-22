import { linkForListing } from '../utils/listing'
import { stringForListingItems } from '../utils/string-for-listing-items'
import { Offer, OfferItem } from '@echo/model'
import { APIEmbedField, EmbedBuilder } from 'discord.js'

export function buildListingEmbed(listing: Offer) {
  return (
    new EmbedBuilder()
      .setTitle(title(listing))
      .setDescription(description())
      .setColor(color())
      // FIXME
      .setFields(fields(listing.senderItems, listing.receiverItems))
      .setURL(linkForListing(listing))
  )
}

// TODO Check to add the discord user as a tag?
// TODO Translation
function title(listing: Offer): string {
  return `A new offer was created from <@${listing.sender.discordId!}>`
}

// FIXME
function description(): string {
  // switch (type) {
  //   case OfferType.BUY:
  //     return 'This is a buy offer'
  //   case OfferType.SELL:
  //     return 'This is a sell offer'
  // }
  return 'This is a listing'
}

// TODO Maybe a color per collection via settings?
function color(): number {
  return 0x00ff66
}

function fields(ownerItems: OfferItem[] | undefined, counterpartyItems: OfferItem[] | undefined): APIEmbedField[] {
  // FIXME
  return [listingItemsField(ownerItems), listingItemsField(counterpartyItems)]
}

function listingItemsField(items: OfferItem[] | undefined): APIEmbedField {
  return {
    name: listingItemFieldName(),
    value: stringForListingItems(items),
    inline: true
  }
}

// FIXME
function listingItemFieldName(): string {
  // switch (type) {
  //   case OfferType.BUY:
  //     return 'Buying:'
  //   case OfferType.SELL:
  //     return 'Selling:'
  // }
  return 'We dont know'
}
