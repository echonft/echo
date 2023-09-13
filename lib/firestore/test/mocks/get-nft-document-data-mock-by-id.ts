import { nftDocumentDataMock } from '@echo/firestore-mocks/nft-document-data-mock'

export const getNftDocumentDataMockById = (id: string) => nftDocumentDataMock[id]!
