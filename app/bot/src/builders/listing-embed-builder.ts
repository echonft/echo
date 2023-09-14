import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { embedValueForTarget } from '@echo/bot/helpers/embed/embed-value-for-target'
import { listingLink } from '@echo/bot/routing/listing-link'
import { getListingItemsGuild } from '@echo/firestore/helpers/listing/get-listing-items-guild'
import type { FirestoreListingComplete } from '@echo/firestore/types/model/firestore-listing-complete'
import type { FirestoreListingItem } from '@echo/firestore/types/model/firestore-listing-item'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import { APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import { flatten, map, prop } from 'ramda'

export function buildListingEmbed(listing: FirestoreListingComplete) {
  return new EmbedBuilder()
    .setTitle(title())
    .setDescription(description(listing))
    .setColor(color())
    .setFields(fields(listing.items, listing.targets))
    .setURL(listingLink(listing.id, getListingItemsGuild(listing).discordId))
}

// Can't mention user on a title
function title(): string {
  return `A new listing was created`
}

function description(listing: FirestoreListingComplete): string {
  return `Created by ${userMention(listing.creator.discordId)}`
}

// TODO Maybe a color per collection via settings?
function color(): number {
  return 0x00ff66
}

function fields(items: FirestoreListingItem[], targets: FirestoreListingTarget[]): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), FirestoreListingTargets(targets)])
}

function listingItemsFields(items: FirestoreListingItem[]): APIEmbedField[] {
  const nfts = map(prop('nft'), items)
  return nfts.map((nft, index) => ({
    name: index === 0 ? listingItemsName() : '\u200b',
    value: embedValueForNft(nft),
    inline: true
  }))
}

function FirestoreListingTargets(targets: FirestoreListingTarget[]): APIEmbedField[] {
  return targets.map((target, index) => ({
    name: index === 0 ? FirestoreListingTargetsName() : '\u200b',
    value: embedValueForTarget(target),
    inline: true
  }))
}

function listingItemsName(): string {
  return 'Items for sale'
}

function FirestoreListingTargetsName(): string {
  return 'Looking for'
}
