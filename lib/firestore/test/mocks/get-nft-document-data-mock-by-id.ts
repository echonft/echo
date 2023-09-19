import { nftDocumentDataMock } from '@echo/firestore-mocks/nft-document-data-mock'

export function getNftDocumentDataMockById(id: string) {
  return nftDocumentDataMock[id]!
}
