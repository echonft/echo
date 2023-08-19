import { embedSeparator } from '../helpers/embed/embed-separator'
import { embedValueForNft } from '../helpers/embed/embed-value-for-nft'
import { embedValueForTarget } from '../helpers/embed/embed-value-for-target'
import { getListingGuild } from '../helpers/get-listing-guild'
import { listingLink } from '../routing/listing-link'
import { Listing, ListingTarget, Nft } from '@echo/firestore'
import { APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import { flatten } from 'ramda'

export function buildListingEmbed(listing: Listing) {
  return new EmbedBuilder()
    .setTitle(title())
    .setDescription(description(listing))
    .setColor(color())
    .setFields(fields(listing.items, listing.targets))
    .setURL(listingLink(listing.id, getListingGuild(listing).discordId))
}

// Can't mention user on a title
function title(): string {
  return `A new listing was created`
}

function description(listing: Listing): string {
  return `Created by ${userMention(listing.creator.discordId)}`
}

// TODO Maybe a color per collection via settings?
function color(): number {
  return 0x00ff66
}

function fields(nfts: Nft[], targets: ListingTarget[]): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(nfts), embedSeparator(), listingTargets(targets)])
}

function listingItemsFields(nfts: Nft[]): APIEmbedField[] {
  return nfts.map((nft, index) => ({
    name: index === 0 ? listingItemsName() : '\u200b',
    value: embedValueForNft(nft),
    inline: true
  }))
}

function listingTargets(targets: ListingTarget[]): APIEmbedField[] {
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
