import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNftItem } from '@echo/bot/helpers/embed/embed-value-for-nft-item'
import { type UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { type Listing } from '@echo/model/types/listing/listing'
import { pathProvider } from '@echo/routing/path-provider'
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

function fields(items: Listing['items'], target: Listing['target']): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), listingTargetFields(target)])
}

function listingItemsFields(items: Listing['items']): APIEmbedField[] {
  const nfts = nftItems(items)
  const mapIndexed = addIndex<Erc721Item | Erc1155Item>(map)
  return mapIndexed(
    (item: Erc721Item | Erc1155Item, index: number) => ({
      name: index === 0 ? i18next.t('listing.embed.items.name') : '\u200b',
      value: embedValueForNftItem(item),
      inline: true
    }),
    nfts
  )
}

function listingTargetFields(target: Listing['target']): APIEmbedField {
  return {
    name: i18next.t('listing.embed.target.name'),
    value: i18next.t('listing.embed.target.value', { count: target.quantity, collectionName: target.collection.name }),
    inline: true
  }
}
