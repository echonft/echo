import { NftCollection } from '../../src'
import { searchNftCollectionsByName } from '../../src/helpers/search-nft-collections-by-name'
import { describe, expect, it } from '@jest/globals'
import { includes } from 'ramda'

describe('helpers - searchNftCollectionsByName', () => {
  const collection1 = {
    id: '1',
    name: 'First Collection'
  } as NftCollection
  const collection2 = {
    id: '2',
    name: 'Second Collection'
  } as NftCollection
  const collection3 = {
    id: '3',
    name: 'Echo Collection'
  } as NftCollection
  const collections = [collection1, collection2, collection3]
  it('find matching collections', () => {
    const results = searchNftCollectionsByName('coll', collections)
    expect(results.length).toBe(3)
    expect(includes(collection1, results)).toBeTruthy()
    expect(includes(collection2, results)).toBeTruthy()
    expect(includes(collection3, results)).toBeTruthy()
  })

  it('find matching collections part 2', () => {
    const results = searchNftCollectionsByName('EcHo', collections)
    expect(results.length).toBe(1)
    expect(includes(collection1, results)).toBeFalsy()
    expect(includes(collection2, results)).toBeFalsy()
    expect(includes(collection3, results)).toBeTruthy()
  })
})
