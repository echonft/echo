import { getNftsForOwnerAndCollection } from '@echo/firestore/crud/nft/get-nfts-for-owner-and-collection'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { collectionMockPxSlug, collectionMockSpiralSlug } from '@echo/model/mocks/collection/collection-mock'
import { getNftMockByIndex } from '@echo/model/mocks/nft/get-nft-mock-by-index'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'
import { andThen, pipe } from 'ramda'

describe('CRUD - nft - getNftsForOwnerAndCollection', () => {
  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwnerAndCollection('not-found', collectionMockPxSlug())
    expect(result).toEqual([])
  })
  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForOwnerAndCollection(userMockJohnnyUsername(), 'not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the user and the collection', async () => {
    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(2)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(getNftMockByIndex(nftIndex(nft)))
        }
      })
    )(userMockJohnnyUsername(), collectionMockPxSlug())
    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(1)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(getNftMockByIndex(nftIndex(nft)))
        }
      })
    )(userMockCrewUsername(), collectionMockPxSlug())
    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(2)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(getNftMockByIndex(nftIndex(nft)))
        }
      })
    )(userMockJohnnyUsername(), collectionMockSpiralSlug())
    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(1)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(getNftMockByIndex(nftIndex(nft)))
        }
      })
    )(userMockCrewUsername(), collectionMockSpiralSlug())
  })
})
