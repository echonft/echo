import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { swapMock } from '@echo/model/mocks/swap-mock'
import type { Swap } from '@echo/model/types/swap'
import { removeNilProps } from '@echo/utils/helpers/remove-nil-props'

export const swapDocumentMock: Omit<SwapDocument, 'offerId'> = {
  ...removeNilProps<Swap, Omit<SwapDocument, 'offerId'>>(swapMock),
  receiverItemCollections: ['spiral-frequencies'],
  receiverItemIndexes: ['spiral-frequencies.1'],
  senderItemCollections: ['pxmythics-genesis'],
  senderItemIndexes: ['pxmythics-genesis.3']
}
