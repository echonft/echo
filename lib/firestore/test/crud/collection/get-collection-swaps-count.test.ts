import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionSwapsCount } from '@echo/firestore/crud/collection/get-collection-swaps-count'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import { swapDocumentMock } from '@echo/firestore/mocks/swap-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - collection - getCollectionSwapsCount', () => {
  let collectionId: Nullable<string>
  let swapId: Nullable<string>

  beforeEach(() => {
    collectionId = undefined
    swapId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      await deleteCollection(collectionId)
    }
    if (!isNil(swapId)) {
      await deleteSwap(swapId)
    }
  })

  it('returns 0 if there are no swaps for the collection', async () => {
    await expect(getCollectionSwapsCount('not-found')).resolves.toEqual(0)
  })

  it('returns the swaps count for the collection', async () => {
    collectionId = await addCollection(collectionDocumentMockPx)
    swapId = await addSwap(swapDocumentMock)
    const count = await getCollectionSwapsCount(collectionDocumentMockPx.slug)
    expect(count).toEqual(1)
  })
})
