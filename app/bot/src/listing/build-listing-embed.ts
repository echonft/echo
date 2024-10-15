import { pathProvider } from '@echo/api/routing/path-provider'
import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNftTokenItem } from '@echo/bot/helpers/embed/embed-value-for-nft-token-item'
import { type UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Item, Items } from '@echo/model/types/item'
import { type Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import type { NftToken } from '@echo/model/types/token'
import { type APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import i18next from 'i18next'
import { addIndex, flatten, map } from 'ramda'

export function buildListingEmbed(listing: Listing, creator: UserDocumentData) {
  return new EmbedBuilder()
    .setTitle(i18next.t('listing.embed.title'))
    .setDescription(i18next.t('listing.embed.description', { user: userMention(creator.discord.id) }))
    .setColor(0x00ff66)
    .setFields(fields(listing.items, listing.target))
    .setURL(pathProvider.collection.default.getUrl({ slug: listing.target.collection.slug }, { listing: listing }))
}

function fields(items: Items, target: ListingTarget): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), listingTargetFields(target)])
}

function listingItemsFields(items: Items): APIEmbedField[] {
  // TODO add ERC-20 tokens
  const nfts = nftItems(items)
  const mapIndexed = addIndex<Item<NftToken>>(map)
  return mapIndexed(
    (item: Item<NftToken>, index: number) => ({
      name: index === 0 ? i18next.t('listing.embed.items.name') : '\u200b',
      value: embedValueForNftTokenItem(item),
      inline: true
    }),
    nfts
  )
}

function listingTargetFields(target: ListingTarget): APIEmbedField {
  return {
    name: i18next.t('listing.embed.target.name'),
    value: i18next.t('listing.embed.target.value', { count: target.quantity, collectionName: target.collection.name }),
    inline: true
  }
}
