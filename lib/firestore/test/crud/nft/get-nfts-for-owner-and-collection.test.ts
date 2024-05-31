import { getNftsForOwnerAndCollection } from '@echo/firestore/crud/nft/get-nfts-for-owner-and-collection'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { collectionMockPxSlug, collectionMockSpiralSlug } from '@echo/model-mocks/collection/collection-mock'
import { getNftMockByIndex } from '@echo/model-mocks/nft/get-nft-mock-by-index'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'
import { andThen, pipe } from 'ramda'

describe('CRUD - nft - getNftsForOwnerAndCollection', () => {
  function expectNftsLength(nfts: Nft[], length: number) {
    expect(nfts.length).toEqual(length)
  }

  function expectNftsEqualMock(nfts: Nft[]) {
    for (const nft of nfts) {
      expect(nft).toStrictEqual(getNftMockByIndex(getNftIndex(nft)))
    }
  }

  function expectNfts(length: number) {
    return function (nfts: Nft[]) {
      expectNftsLength(nfts, length)
      expectNftsEqualMock(nfts)
    }
  }

  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwnerAndCollection('not-found', collectionMockPxSlug())
    expect(result).toEqual([])
  })
  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForOwnerAndCollection(userMockJohnnyUsername(), 'not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the user and the collection', async () => {
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(2)))(userMockJohnnyUsername(), collectionMockPxSlug())
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(1)))(userMockCrewUsername(), collectionMockPxSlug())
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(2)))(
      userMockJohnnyUsername(),
      collectionMockSpiralSlug()
    )
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(1)))(userMockCrewUsername(), collectionMockSpiralSlug())
  })
})
