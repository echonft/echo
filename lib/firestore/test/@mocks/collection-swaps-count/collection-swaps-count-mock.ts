import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { collectionMockPxId, collectionMockSpiralId } from '@echo/model-mocks/collection/collection-mock'

export function collectionSwapsCountMock(): Record<string, CollectionSwapsCount> {
  return {
    zkLBR3tGni1Z695gFQVU: {
      collectionId: collectionMockPxId(),
      swapsCount: 1
    },
    LNPLEks5c1fsNIZIimAw: {
      collectionId: collectionMockSpiralId(),
      swapsCount: 1
    }
  }
}
