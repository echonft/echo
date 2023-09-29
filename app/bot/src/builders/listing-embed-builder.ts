import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { embedValueForTarget } from '@echo/bot/helpers/embed/embed-value-for-target'
import { listingLink } from '@echo/bot/routing/listing-link'
import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import { flatten, map, prop } from 'ramda'

export function buildListingEmbed(listing: FirestoreListing, listingCreator: FirestoreUser) {
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
