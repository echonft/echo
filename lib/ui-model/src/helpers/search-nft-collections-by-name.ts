import { NftCollection } from '../types/nft-collection'
import { filter, pipe, propSatisfies, test, toLower } from 'ramda'

export function searchNftCollectionsByName(query: string, collections: Partial<NftCollection>[]) {
  const regex = new RegExp(query, 'ig')
  return filter(propSatisfies(pipe(toLower, test(regex)), 'name'))(collections)
}
