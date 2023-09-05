import { getNftsForCollection } from '../../../src/crud/nft/get-nfts-for-collection'
import { getAllNftMocks } from '../../mocks/get-all-nft-mocks'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { equals, filter, find, forEach, map, modify, path, pick, pipe, propEq } from 'ramda'

describe('CRUD - nft - getNftsForCollection', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found')
    expect(result).toEqual([])
  })

  it('returns the nfts of the collection - with collection prop undefined', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const nfts = await getNftsForCollection(collectionId)
    const nftMocks = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filter(pipe(path(['collection', 'id']), equals(collectionId))),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map(modify('collection', pick(['id', 'name'])))
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
