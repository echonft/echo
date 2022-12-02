import { Offer, OfferItem, OfferType } from '@echo/model'
import { APIEmbedField, EmbedBuilder } from 'discord.js'
import { linkForOffer } from '../utils/offer'
import { stringForOfferItems } from '../utils/offer-item'
import { opposite } from '../utils/offer-type'

export function buildOfferEmbed(offer: Offer) {
  return new EmbedBuilder()
    .setTitle(title(offer))
    .setDescription(description(offer.type))
    .setColor(color())
    .setFields(fields(offer.ownerItems, offer.counterpartyItems, offer.type))
    .setURL(linkForOffer(offer))
}

// TODO Check to add the discord user as a tag?
function title(offer: Offer): string {
  return `A new offer was created from <@${offer.owner.discordId}>`
}

function description(type: OfferType): string {
  switch (type) {
    case OfferType.BUY:
      return 'This is a buy offer'
    case OfferType.SELL:
      return 'This is a sell offer'
  }
}

// TODO Maybe a color per collection via settings?
function color(): number {
  return 0x00ff66
}

function fields(
  ownerItems: OfferItem[] | undefined,
  counterpartyItems: OfferItem[] | undefined,
  type: OfferType
): APIEmbedField[] {
  return [offerItemsField(ownerItems, type), offerItemsField(counterpartyItems, opposite(type))]
}

function offerItemsField(items: OfferItem[] | undefined, type: OfferType): APIEmbedField {
  return {
    name: offerItemFieldName(type),
    value: stringForOfferItems(items),
    inline: true
  }
}

function offerItemFieldName(type: OfferType): string {
  switch (type) {
    case OfferType.BUY:
      return 'Buying:'
    case OfferType.SELL:
      return 'Selling:'
  }
}
