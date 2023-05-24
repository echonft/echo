import { listingLink } from '../routing/listing-link'
import { embedSeparator } from '../utils/embed/embed-separator'
import { embedValueForNft } from '../utils/embed/embed-value-for-nft'
import { embedValueForTarget } from '../utils/embed/embed-value-for-target'
import { Contract, Nft, RequestForOffer } from '@echo/model'
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

function fields(nfts: Nft[], targets: Contract[]): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(nfts), embedSeparator(), listingTargets(targets)])
}

function listingItemsFields(nfts: Nft[]): APIEmbedField[] {
  return nfts.map((nft, index) => ({
    name: index === 0 ? listingItemsName() : '\u200b',
    value: embedValueForNft(nft),
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
