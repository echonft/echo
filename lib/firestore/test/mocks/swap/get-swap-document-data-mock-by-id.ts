import { swapDocumentDataMock } from '@echo/firestore-mocks/swap/swap-document-data-mock'

export function getSwapDocumentDataMockById(id: string) {
  return swapDocumentDataMock[id]!
}
