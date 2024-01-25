import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNftsForOwner', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwner('not-found')
    expect(result).toEqual([])
  })

  it('returns the nfts of the user', async () => {
    let nfts = await getNftsForOwner('johnnycagewins')
    expect(nfts.length).toEqual(4)
    for (const nft of nfts) {
      expect(nft).toStrictEqual(getNftMockById(nft.id))
    }
    nfts = await getNftsForOwner('crewnft_')
    expect(nfts.length).toEqual(2)
    for (const nft of nfts) {
      expect(nft).toStrictEqual(getNftMockById(nft.id))
    }
  })
})
