import { linkForOffer } from '../utils/offer'
import { stringForOfferItems } from '../utils/offer-item'
import { Offer, OfferItem } from '@echo/model'
import { APIEmbedField, EmbedBuilder } from 'discord.js'

export function buildOfferEmbed(offer: Offer) {
  return (
    new EmbedBuilder()
      .setTitle(title(offer))
      .setDescription(description())
      .setColor(color())
      // FIXME
      .setFields(fields(offer.senderItems, offer.receiverItems))
      .setURL(linkForOffer(offer))
  )
}

// TODO Check to add the discord user as a tag?
function title(offer: Offer): string {
  return `A new offer was created from <@${offer.sender.discordId!}>`
}

// FIXME
function description(): string {
  // switch (type) {
  //   case OfferType.BUY:
  //     return 'This is a buy offer'
  //   case OfferType.SELL:
  //     return 'This is a sell offer'
  // }
  return 'This is an offer'
}

// TODO Maybe a color per collection via settings?
function color(): number {
  return 0x00ff66
}

function fields(ownerItems: OfferItem[] | undefined, counterpartyItems: OfferItem[] | undefined): APIEmbedField[] {
  // FIXME
  return [offerItemsField(ownerItems), offerItemsField(counterpartyItems)]
}

function offerItemsField(items: OfferItem[] | undefined): APIEmbedField {
  return {
    name: offerItemFieldName(),
    value: stringForOfferItems(items),
    inline: true
  }
}

// FIXME
function offerItemFieldName(): string {
  // switch (type) {
  //   case OfferType.BUY:
  //     return 'Buying:'
  //   case OfferType.SELL:
  //     return 'Selling:'
  // }
  return 'We dont know'
}
