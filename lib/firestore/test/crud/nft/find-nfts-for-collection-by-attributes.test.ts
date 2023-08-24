import { findNftsForCollectionByAttributes } from '../../../src/crud/nft/find-nfts-for-collection-by-attributes'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftsForCollectionByAttributes', () => {
  beforeAll(initialize)
  afterAll(terminate)

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
    expect(result.length).toEqual(1)
    expect(result[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
    const result2 = await findNftsForCollectionByAttributes('spiral-frequencies', [])
    expect(result2.length).toEqual(1)
    expect(result2[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })

  it('returns the nfts of the collection with at least one of the given attributes', async () => {
    const result = await findNftsForCollectionByAttributes('spiral-frequencies', [
      { value: 'not-found', trait: 'Algorithm' },
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'not-found', trait: 'not-found' }
    ])
    expect(result.length).toEqual(1)
    expect(result[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})
