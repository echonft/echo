import { getNftsForOwnerAndCollection } from '@echo/firestore/crud/nft/get-nfts-for-owner-and-collection'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { nftDocumentMocks } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'
import { andThen, find, pipe } from 'ramda'

describe('CRUD - nft - getNftsForOwnerAndCollection', () => {
  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwnerAndCollection('not-found', collectionMockPx.slug)
    expect(result).toEqual([])
  })
  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForOwnerAndCollection(userMockJohnny.username, 'not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the user and the collection', async () => {
    function findNftDocumentMock(nft: NftDocument) {
      return find(eqNft(nft), nftDocumentMocks)
    }

    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(2)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(findNftDocumentMock(nft))
        }
      })
    )(userMockJohnny.username, collectionMockPx.slug)
    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(1)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(findNftDocumentMock(nft))
        }
      })
    )(userMockCrew.username, collectionMockPx.slug)
    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(2)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(findNftDocumentMock(nft))
        }
      })
    )(userMockJohnny.username, collectionMockSpiral.slug)
    await pipe(
      getNftsForOwnerAndCollection,
      andThen((nfts) => {
        expect(nfts.length).toEqual(1)
        for (const nft of nfts) {
          expect(nft).toStrictEqual(findNftDocumentMock(nft))
        }
      })
    )(userMockCrew.username, collectionMockSpiral.slug)
  })
})
