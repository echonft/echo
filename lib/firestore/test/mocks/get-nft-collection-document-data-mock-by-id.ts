import { nftCollectionDocumentDataMock } from '@echo/firestore-mocks/nft-collection-document-data-mock'

export function getNftCollectionDocumentDataMockById(id: string) {
  return nftCollectionDocumentDataMock[id]!
}
