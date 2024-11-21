import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionNftsCount } from '@echo/firestore/crud/collection/get-collection-nfts-count'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import {
  nftDocumentMockPx1,
  nftDocumentMockPx2,
  nftDocumentMockPx3,
  nftDocumentMockSpiral1,
  nftDocumentMockSpiral2,
  nftDocumentMockSpiral3
} from '@echo/firestore/mocks/nft-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import { addNft } from '@echo/test/firestore/crud/nft/add-nft'
import { deleteNft } from '@echo/test/firestore/crud/nft/delete-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, isEmpty, isNil, pipe } from 'ramda'

describe('CRUD - collection - getCollectionNftsCount', () => {
  let collectionId: Nullable<string>
  let nftIds: string[]

  beforeEach(() => {
    collectionId = undefined
    nftIds = []
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      await deleteCollection(collectionId)
    }
    if (!isEmpty(nftIds)) {
      for (const id of nftIds) {
        await deleteNft(id)
      }
    }
  })

  it('returns 0 if there are no nfts for the collection', async () => {
    await expect(getCollectionNftsCount('not-found')).resolves.toEqual(0)
  })

  it('returns the nfts count for the collection', async () => {
    collectionId = await addCollection(collectionDocumentMockPx)
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
    const count = await getCollectionNftsCount(collectionDocumentMockPx.slug)
    expect(count).toEqual(3)
  })
})
