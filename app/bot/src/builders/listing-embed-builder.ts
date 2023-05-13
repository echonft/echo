import { listingLink } from '../routing/listing-link'
import { stringForListingItems } from '../utils/string-for-listing-items'
import { Contract, OfferItem, RequestForOffer } from '@echo/model'
import { APIEmbedField, EmbedBuilder } from 'discord.js'

export function buildListingEmbed(listing: RequestForOffer) {
  return (
    new EmbedBuilder()
      .setTitle(title(listing))
      .setDescription(description())
      .setColor(color())
      // FIXME
      .setFields(fields(listing.items, listing.target))
      .setURL(listingLink(listing))
  )
}

// TODO Check to add the discord user as a tag?
// TODO Translation
function title(listing: RequestForOffer): string {
  return `A new offer was created from <@${listing.sender.discordId}>`
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

function fields(items: OfferItem[], target: Contract[]): APIEmbedField[] {
  // FIXME
  return [listingItemsField(items), listingTarget(target)]
}

function listingItemsField(items: OfferItem[] | undefined): APIEmbedField {
  return {
    name: listingItemFieldName(),
    value: stringForListingItems(items),
    inline: true
  }
}

// TODO
function listingTarget(_target: Contract[]): APIEmbedField {
  return {
    name: 'Contract',
    value: 'TODO',
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
