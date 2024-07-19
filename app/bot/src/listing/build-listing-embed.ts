import { pathProvider } from '@echo/api/routing/path-provider'
import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNft } from '@echo/bot/helpers/embed/embed-value-for-nft'
import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { type Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import type { Nft } from '@echo/model/types/nft'
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
      .setFields(fields(listing.items, listing.target))
      .setURL(pathProvider.collection.default.getUrl({ slug: listing.target.collection.slug }, { listing: listing }))
  )
}

function fields(items: Nft[], target: ListingTarget): APIEmbedField[] {
  // TODO Should work as is, but we might need to adjust if target change
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), ListingTarget(target)])
}

function listingItemsFields(items: Nft[]): APIEmbedField[] {
  const mapIndexed = addIndex<Nft>(map)
  return mapIndexed(
    (item: Nft, index: number) => ({
      name: index === 0 ? i18next.t('listing.embed.items.name') : '\u200b',
      value: embedValueForNft(item),
      inline: true
    }),
    items
  )
}

function ListingTarget(target: ListingTarget): APIEmbedField {
  return {
    name: i18next.t('listing.embed.target.name'),
    value: i18next.t('listing.embed.target.value', { count: target.amount, collectionName: target.collection.name }),
    inline: true
  }
}
