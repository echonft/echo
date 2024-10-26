import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { swapMock } from '@echo/model/mocks/swap-mock'

export const swapDocumentMock: Omit<SwapDocument, 'offerId'> = {
  ...swapMock,
  receiverItemCollections: ['spiral-frequencies'],
  receiverItemIndexes: ['spiral-frequencies.1'],
  senderItemCollections: ['pxmythics-genesis'],
  senderItemIndexes: ['pxmythics-genesis.3']
}
