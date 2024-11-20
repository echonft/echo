import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionOffersCount } from '@echo/firestore/crud/collection/get-collection-offers-count'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import {
  offerDocumentMockFromJohnnycage,
  offerDocumentMockToJohnnycage
} from '@echo/firestore/mocks/offer-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import { addOffer } from '@echo/test/firestore/crud/offer/add-offer'
import { deleteOffer } from '@echo/test/firestore/crud/offer/delete-offer'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, isEmpty, isNil, pipe } from 'ramda'

describe('CRUD - collection - getCollectionOffersCount', () => {
  let collectionId: Nullable<string>
  let offerIds: string[]

  beforeEach(() => {
    collectionId = undefined
    offerIds = []
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      await deleteCollection(collectionId)
    }
    if (!isEmpty(offerIds)) {
      for (const id of offerIds) {
        await deleteOffer(id)
      }
    }
  })

  it('returns 0 if there are no offers for the collection', async () => {
    await expect(getCollectionOffersCount('not-found')).resolves.toEqual(0)
  })

  it('returns the offers count for the collection', async () => {
    collectionId = await addCollection(collectionDocumentMockPx)
    await pipe(
      addOffer,
      andThen((id) => {
        offerIds.push(id)
      })
    )(offerDocumentMockFromJohnnycage)
    await pipe(
      addOffer,
      andThen((id) => {
        offerIds.push(id)
      })
    )(offerDocumentMockToJohnnycage)
    const count = await getCollectionOffersCount(collectionDocumentMockPx.slug)
    expect(count).toEqual(2)
  })
})
