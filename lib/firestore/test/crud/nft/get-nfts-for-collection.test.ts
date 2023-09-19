import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getAllNftMocks } from '@echo/firestore-mocks/get-all-nft-mocks'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { equals, filter, find, forEach, path, pipe, propEq } from 'ramda'

describe('CRUD - nft - getNftsForCollection', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found')
    expect(result).toEqual([])
  })

  it('returns the nfts of the collection - with collection prop undefined', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const nfts = await getNftsForCollection('spiral-frequencies')
    const nftMocks = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filter(pipe(path(['collection', 'id']), equals(collectionId)))
    )(getAllNftMocks())
    expect(nfts.length).toEqual(nftMocks.length)
    forEach((nft) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mock = find(propEq(nft.id, 'id'), nftMocks)
      expect(nft).toStrictEqual(mock)
    }, nfts)
  })
})
