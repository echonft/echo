import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { swapMock } from '@echo/model/mocks/swap-mock'

export const swapDocumentMock: SwapDocument = {
  ...swapMock,
  offerId: 'offer-id',
  receiverItemCollections: ['spiral-frequencies'],
  receiverItemIndexes: ['spiral-frequencies.1'],
  senderItemCollections: ['pxmythics-genesis'],
  senderItemIndexes: ['pxmythics-genesis.3']
}
