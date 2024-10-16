import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { getNftCollectionSlug } from '@echo/model/helpers/nft/get-nft-collection-slug'
import type { Slug } from '@echo/model/types/slug'
import { map, pipe, prop, uniq } from 'ramda'

export function getListingItemsCollectionSlugs(items: ListingDocumentData['items']): Slug[] {
  return pipe(map(pipe(prop('token'), getNftCollectionSlug)), uniq)(items)
}
