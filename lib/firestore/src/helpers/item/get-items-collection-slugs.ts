import { getItemsNftTokens } from '@echo/firestore/helpers/item/get-items-nft-tokens'
import type { ItemsDocumentData } from '@echo/firestore/types/model/item-document-data'
import type { Erc1155TokenDocumentData, Erc721TokenDocumentData } from '@echo/firestore/types/model/token-document-data'
import { getNftCollectionSlug } from '@echo/model/helpers/nft/get-nft-collection-slug'
import type { Slug } from '@echo/model/types/slug'
import { map, pipe, uniq } from 'ramda'

export function getItemsCollectionSlugs(items: ItemsDocumentData): Slug[] {
  return pipe<[ItemsDocumentData], (Erc721TokenDocumentData | Erc1155TokenDocumentData)[], Slug[], Slug[]>(
    getItemsNftTokens,
    map(getNftCollectionSlug),
    uniq
  )(items)
}
