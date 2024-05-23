import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { COLLECTION_MOCK_PX_ID, COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'

export const collectionSwapsCountMock: Record<string, CollectionSwapsCount> = {
  zkLBR3tGni1Z695gFQVU: {
    collectionId: COLLECTION_MOCK_PX_ID,
    swapsCount: 1
  },
  LNPLEks5c1fsNIZIimAw: {
    collectionId: COLLECTION_MOCK_SPIRAL_ID,
    swapsCount: 1
  }
}
