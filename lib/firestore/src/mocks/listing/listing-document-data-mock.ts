import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { always, assoc, converge, dissoc, identity, pipe, prop } from 'ramda'

function getDocumentData(listingId: string): ListingDocumentData {
  return pipe(
    getListingMockById,
    dissoc('readOnly'),
    converge(assoc, [always('itemIndexes'), pipe(prop('items'), getNftIndexForNfts), identity]),
    converge(assoc, [always('itemCollections'), pipe(prop('items'), getNftsCollectionSlugs), identity])
  )(listingId) as unknown as ListingDocumentData
}

export function listingDocumentDataMock(): Record<string, ListingDocumentData> {
  return { jUzMtPGKM62mMhEcmbN4: getDocumentData(listingMockId()) }
}
