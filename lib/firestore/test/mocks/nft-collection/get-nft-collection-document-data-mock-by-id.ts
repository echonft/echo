import { nftCollectionDocumentDataMock } from '@echo/firestore-mocks/nft-collection/nft-collection-document-data-mock'

export function getNftCollectionDocumentDataMockById(id: string) {
  return nftCollectionDocumentDataMock[id]!
}
