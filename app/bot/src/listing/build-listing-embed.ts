import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { listingLink } from '@echo/bot/listing/listing-link'
import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { type Listing } from '@echo/model/types/listing'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import i18next from 'i18next'
import { addIndex, flatten, map } from 'ramda'

export function buildListingEmbed(listing: Listing, creator: UserDocumentData) {
  return (
    new EmbedBuilder()
      .setTitle(i18next.t('listing.embed.title'))
      .setDescription(i18next.t('listing.embed.description', { user: userMention(creator.discord.id) }))
      // TODO Maybe a color per collection via settings?
      .setColor(0x00ff66)
      .setFields(fields(listing.items, listing.targets))
      .setURL(listingLink(listing.id))
  )
}

function fields(items: ListingItem[], targets: ListingTarget[]): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), ListingTargets(targets)])
}

function listingItemsFields(items: ListingItem[]): APIEmbedField[] {
  const mapIndexed = addIndex<ListingItem>(map)
  return mapIndexed(
    (item: ListingItem, index) => ({
      name: index === 0 ? i18next.t('listing.embed.items.name') : '\u200b',
      value: embedValueForNft(item.nft),
      inline: true
    }),
    items
  )
}

function ListingTargets(targets: ListingTarget[]): APIEmbedField[] {
  const mapIndexed = addIndex<ListingTarget>(map)
  return mapIndexed(
    (target: ListingTarget, index) => ({
      name: index === 0 ? i18next.t('listing.embed.targets.name') : '\u200b',
      value: i18next.t('listing.embed.targets.value', { count: target.amount, collectionName: target.collection.name }),
      inline: true
    }),
    targets
  )
}
