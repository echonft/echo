import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionCounts } from '@echo/firestore/crud/collection/get-collection-counts'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import {
  nftDocumentMockPx1,
  nftDocumentMockPx2,
  nftDocumentMockPx3,
  nftDocumentMockSpiral1,
  nftDocumentMockSpiral2,
  nftDocumentMockSpiral3
} from '@echo/firestore/mocks/nft-document-mock'
import {
  offerDocumentMockFromJohnnycage,
  offerDocumentMockToJohnnycage
} from '@echo/firestore/mocks/offer-document-mock'
import { swapDocumentMock } from '@echo/firestore/mocks/swap-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import { addListing } from '@echo/test/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/test/firestore/crud/listing/delete-listing'
import { addNft } from '@echo/test/firestore/crud/nft/add-nft'
import { deleteNft } from '@echo/test/firestore/crud/nft/delete-nft'
import { addOffer } from '@echo/test/firestore/crud/offer/add-offer'
import { deleteOffer } from '@echo/test/firestore/crud/offer/delete-offer'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, isEmpty, isNil, pipe } from 'ramda'

describe('CRUD - collection - getCollectionCounts', () => {
  let collectionId: Nullable<string>
  let listingId: Nullable<string>
  let nftIds: string[]
  let offerIds: string[]
  let swapId: Nullable<string>

  beforeEach(() => {
    collectionId = undefined
    listingId = undefined
    nftIds = []
    offerIds = []
    swapId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      await deleteCollection(collectionId)
    }
    if (!isNil(listingId)) {
      await deleteListing(listingId)
    }
    if (!isEmpty(nftIds)) {
      for (const id of nftIds) {
        await deleteNft(id)
      }
    }
    if (!isEmpty(offerIds)) {
      for (const id of offerIds) {
        await deleteOffer(id)
      }
    }
    if (!isNil(swapId)) {
      await deleteSwap(swapId)
    }
  })

  it('returns all counts to 0 if the collection does not exist', async () => {
    await expect(getCollectionCounts('not-found')).resolves.toEqual({
      offersCount: 0,
      listingsCount: 0,
      nftsCount: 0,
      swapsCount: 0
    })
  })

  it('returns the offer count for the collection', async () => {
    collectionId = await addCollection(collectionDocumentMockPx)
    listingId = await addListing(listingDocumentMock)
    await expect(getCollectionCounts(collectionDocumentMockPx.slug)).resolves.toEqual({
      offersCount: 0,
      listingsCount: 1,
      nftsCount: 0,
      swapsCount: 0
    })
    await pipe(
      addNft,
      andThen((id) => {
        nftIds.push(id)
      })
    )(nftDocumentMockPx1)
    await pipe(
      addNft,
      andThen((id) => {
        nftIds.push(id)
      })
    )(nftDocumentMockPx2)
    await pipe(
      addNft,
      andThen((id) => {
        nftIds.push(id)
      })
    )(nftDocumentMockPx3)
    await pipe(
      addNft,
      andThen((id) => {
        nftIds.push(id)
      })
    )(nftDocumentMockSpiral1)
    await pipe(
      addNft,
      andThen((id) => {
        nftIds.push(id)
      })
    )(nftDocumentMockSpiral2)
    await pipe(
      addNft,
      andThen((id) => {
        nftIds.push(id)
      })
    )(nftDocumentMockSpiral3)
    await expect(getCollectionCounts(collectionDocumentMockPx.slug)).resolves.toEqual({
      offersCount: 0,
      listingsCount: 1,
      nftsCount: 3,
      swapsCount: 0
    })
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
    await expect(getCollectionCounts(collectionDocumentMockPx.slug)).resolves.toEqual({
      offersCount: 2,
      listingsCount: 1,
      nftsCount: 3,
      swapsCount: 0
    })
    swapId = await addSwap(swapDocumentMock)
    await expect(getCollectionCounts(collectionDocumentMockPx.slug)).resolves.toEqual({
      offersCount: 2,
      listingsCount: 1,
      nftsCount: 3,
      swapsCount: 1
    })
  })
})
