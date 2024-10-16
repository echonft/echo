import { type Collection } from '@echo/model/types/collection/collection'
import { filter, pipe, propSatisfies, test, toLower } from 'ramda'

export function searchCollectionsByName(query: string, collections: Collection[]) {
  const regex = new RegExp(query, 'ig')
  return filter(propSatisfies(pipe(toLower, test(regex)), 'name'))(collections)
}
