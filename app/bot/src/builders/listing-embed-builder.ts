import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { embedValueForTarget } from '@echo/bot/helpers/embed/embed-value-for-target'
import { listingLink } from '@echo/bot/routing/listing-link'
import { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import { flatten, map, prop } from 'ramda'

export function buildListingEmbed(listing: Listing, listingCreator: UserDocumentData) {
  return new EmbedBuilder()
    .setTitle(title())
    .setDescription(description(listingCreator.discord.id))
    .setColor(color())
    .setFields(fields(listing.items, listing.targets))
    .setURL(listingLink(listingCreator.username))
}

// Can't mention user on a title
function title(): string {
  return `A new listing was created`
}

function description(creatorDiscordId: string): string {
  return `Created by ${userMention(creatorDiscordId)}`
}

// TODO Maybe a color per collection via settings?
function color(): number {
  return 0x00ff66
}

function fields(items: ListingItem[], targets: ListingTarget[]): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), ListingTargets(targets)])
}

function listingItemsFields(items: ListingItem[]): APIEmbedField[] {
  const nfts = map(prop('nft'), items)
  return nfts.map((nft, index) => ({
    name: index === 0 ? listingItemsName() : '\u200b',
    value: embedValueForNft(nft),
    inline: true
  }))
}

function ListingTargets(targets: ListingTarget[]): APIEmbedField[] {
  return targets.map((target, index) => ({
    name: index === 0 ? ListingTargetsName() : '\u200b',
    value: embedValueForTarget(target),
    inline: true
  }))
}

function listingItemsName(): string {
  return 'Items for sale'
}

function ListingTargetsName(): string {
  return 'Looking for'
}
