import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { map, pipe, prop, uniq } from 'ramda'

export function getListingItemsIndexes(items: ListingDocumentData['items']): NftIndex[] {
  return pipe(map(pipe(prop('token'), nftIndex)), uniq)(items)
}
