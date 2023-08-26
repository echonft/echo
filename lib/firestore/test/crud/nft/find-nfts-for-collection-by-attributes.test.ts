import { findNftsForCollectionByAttributes } from '../../../src/crud/nft/find-nfts-for-collection-by-attributes'
import { getNftMockById } from '../../mocks/get-nft-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { includes, map, prop } from 'ramda'

describe('CRUD - nft - findNftsForCollectionByAttributes', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array the collection is not found', async () => {
    const result = await findNftsForCollectionByAttributes('not-found')
    expect(result).toEqual([])
    const result2 = await findNftsForCollectionByAttributes('not-found', [{ value: 'archimedean', trait: 'Algorithm' }])
    expect(result2).toEqual([])
  })

  it('returns an empty array the collection is found but no nfts match the provided attributes', async () => {
    const result = await findNftsForCollectionByAttributes('spiral-frequencies', [
      { value: 'not-found', trait: 'Algorithm' }
    ])
    expect(result).toEqual([])
  })

  it('returns all the nfts of the collection if no attributes are provided', async () => {
    const result = await findNftsForCollectionByAttributes('spiral-frequencies')
    expect(result.length).toEqual(3)
    const nftIds = map(prop('id'), result)
    expect(includes('8hHFadIrrooORfTOLkBg', nftIds)).toBeTruthy()
    expect(includes('iRZFKEujarikVjpiFAkE', nftIds)).toBeTruthy()
    expect(includes('5SeF1NSN5uPUxtWSr516', nftIds)).toBeTruthy()
    const result2 = await findNftsForCollectionByAttributes('spiral-frequencies', [])
    expect(result2.length).toEqual(3)
    const nftIds2 = map(prop('id'), result2)
    expect(includes('8hHFadIrrooORfTOLkBg', nftIds2)).toBeTruthy()
    expect(includes('iRZFKEujarikVjpiFAkE', nftIds2)).toBeTruthy()
    expect(includes('5SeF1NSN5uPUxtWSr516', nftIds2)).toBeTruthy()
  })

  it('returns the nfts of the collection with at least one of the given attributes', async () => {
    const result = await findNftsForCollectionByAttributes('spiral-frequencies', [
      { value: 'not-found', trait: 'Algorithm' },
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'not-found', trait: 'not-found' }
    ])
    expect(result.length).toEqual(1)
    expect(result[0]).toStrictEqual(getNftMockById('8hHFadIrrooORfTOLkBg'))
  })
})
