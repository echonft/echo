import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import { getCollectionMockBySlug } from '@echo/model/mocks/collection/get-collection-mock-by-slug'
import type { Nft } from '@echo/model/types/nft'
import { assoc, dissoc, pipe } from 'ramda'

export function getNftDocumentDataMock(nft: Nft): NftDocumentData {
  const collection = getCollectionMockBySlug(nft.collection.slug)
  return pipe(dissoc('tokenIdLabel'), assoc('collection', collection))(nft)
}
