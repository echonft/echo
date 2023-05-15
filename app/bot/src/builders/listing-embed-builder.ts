import { listingLink } from '../routing/listing-link'
import { embedSeparator } from '../utils/embed/embed-separator'
import { embedValueForOfferItem } from '../utils/embed/embed-value-for-offer-item'
import { embedValueForTarget } from '../utils/embed/embed-value-for-target'
import { Contract, OfferItem, RequestForOffer } from '@echo/model'
import { APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import { flatten } from 'ramda'

export function buildListingEmbed(listing: RequestForOffer) {
  return new EmbedBuilder()
    .setTitle(title())
    .setDescription(description(listing))
    .setColor(color())
    .setFields(fields(listing.items, listing.target))
    .setURL(listingLink(listing))
}

// Can't mention user on a title
function title(): string {
  return `A new listing was created`
}

function description(listing: RequestForOffer): string {
  return `Created by ${userMention(listing.sender.discordId)}`
}

// TODO Maybe a color per collection via settings?
function color(): number {
  return 0x00ff66
}

function fields(items: OfferItem[], targets: Contract[]): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), listingTargets(targets)])
}

function listingItemsFields(items: OfferItem[]): APIEmbedField[] {
  return items.map((item, index) => ({
    name: index === 0 ? listingItemsName() : '\u200b',
    value: embedValueForOfferItem(item),
    inline: true
  }))
}

function listingTargets(targets: Contract[]): APIEmbedField[] {
  return targets.map((target, index) => ({
    name: index === 0 ? listingTargetsName() : '\u200b',
    value: embedValueForTarget(target),
    inline: true
  }))
}

function listingItemsName(): string {
  return 'Items for sale'
}
function listingTargetsName(): string {
  return 'Looking for'
}
