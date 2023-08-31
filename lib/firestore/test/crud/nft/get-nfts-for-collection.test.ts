import { getNftsForCollection } from '../../../src/crud/nft/get-nfts-for-collection'
import { getAllNftMocks } from '../../mocks/get-all-nft-mocks'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { equals, filter, forEach, includes, map, path, pipe, prop } from 'ramda'

describe('CRUD - nft - getNftsForCollection', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found')
    expect(result).toEqual([])
  })

  it('returns the nfts of the collection', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const nfts = await getNftsForCollection(collectionId)
    const nftMocksIds = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filter(pipe(path(['collection', 'id']), equals(collectionId))),
      map(prop('id'))
    )(getAllNftMocks())
    const nftsIds = map(prop('id'), nfts)
    expect(nftsIds.length).toEqual(nftMocksIds.length)
    forEach((nftId) => {
      expect(includes(nftId, nftMocksIds)).toBeTruthy()
    }, nftsIds)
  })
})
