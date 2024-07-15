import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import type { Collection } from '@echo/model/types/collection'
import { __, either, eqProps, filter, groupWith, gt, length, pipe } from 'ramda'

export async function getDuplicateCollections() {
  const collections = await getAllCollections()
  return pipe<[Collection[]], Collection[][], Collection[][]>(
    groupWith<Collection>(
      either<(objA: Collection, objB: Collection) => boolean>(eqProps('slug'), eqProps('contract'))
    ),
    filter(pipe<[Collection[]], number, boolean>(length, gt(__, 1)))
  )(collections)
}
