import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { embedValueForNftItem } from '@echo/bot/helpers/embed/embed-value-for-nft-item'
import { type UserDocument } from '@echo/firestore/types/model/user-document'
import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { NftItem } from '@echo/model/types/item'
import { type Listing } from '@echo/model/types/listing'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { type APIEmbedField, EmbedBuilder, userMention } from 'discord.js'
import i18next from 'i18next'
import { addIndex, flatten, map, type NonEmptyArray } from 'ramda'

export function buildListingEmbed(listing: Listing, creator: UserDocument) {
  return new EmbedBuilder()
    .setTitle(i18next.t('listing.embed.title'))
    .setDescription(i18next.t('listing.embed.description', { user: userMention(creator.discord.id) }))
    .setColor(0x00ff66)
    .setFields(fields(listing.items, listing.target))
    .setURL(
      pathProvider.collection.default.withQuery({ listing: listing }).getUrl({ slug: listing.target.collection.slug })
    )
}

function fields(items: NonEmptyArray<NftItem>, target: Listing['target']): APIEmbedField[] {
  return flatten([embedSeparator(), listingItemsFields(items), embedSeparator(), listingTargetFields(target)])
}

function listingItemsFields(items: NonEmptyArray<NftItem>): APIEmbedField[] {
  const nfts = nftItems(items)
  const mapIndexed = addIndex<NftItem>(map)
  return mapIndexed(
    (item: NftItem, index: number) => ({
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
