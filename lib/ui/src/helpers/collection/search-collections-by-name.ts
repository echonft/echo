import { NftCollection } from '@echo/ui-model'
import { filter, pipe, propSatisfies, test, toLower } from 'ramda'

export function searchCollectionsByName(query: string, collections: Partial<NftCollection>[]) {
  const regex = new RegExp(query, 'ig')
  return filter(propSatisfies(pipe(toLower, test(regex)), 'name'))(collections)
}
