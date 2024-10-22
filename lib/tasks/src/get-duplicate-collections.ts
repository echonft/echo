import { getCollections } from '@echo/firestore/crud/collection/get-collections'
import type { Collection } from '@echo/model/types/collection/collection'
import { __, either, eqProps, filter, groupWith, gt, length, pipe } from 'ramda'

export async function getDuplicateCollections() {
  const collections = await getCollections()
  return pipe<[Collection[]], Collection[][], Collection[][]>(
    groupWith<Collection>(
      either<(objA: Collection, objB: Collection) => boolean>(eqProps('slug'), eqProps('contract'))
    ),
    filter(pipe<[Collection[]], number, boolean>(length, gt(__, 1)))
  )(collections)
}
