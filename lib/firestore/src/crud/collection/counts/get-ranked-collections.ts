import { getCollectionSwapsCount } from '@echo/firestore/crud/collection/counts/get-collection-swaps-count'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import type { Collection } from '@echo/model/types/collection/collection'
import type { CollectionWithSwapsCount } from '@echo/model/types/collection/collection-with-swaps-count'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { promiseAll } from '@echo/utils/fp/promise-all'
import {
  addIndex,
  always,
  andThen,
  ascend,
  assoc,
  descend,
  isNotNil,
  map,
  pipe,
  prop,
  sortWith,
  take,
  when
} from 'ramda'

async function collectionWithSwapsCount(collection: Collection): Promise<CollectionWithSwapsCount> {
  const swapsCount = await getCollectionSwapsCount(collection.slug)
  return assoc('swapsCount', swapsCount, collection)
}

function addRank(collections: CollectionWithSwapsCount[]): CollectionWithRank[] {
  const mapIndexed = addIndex(map<CollectionWithSwapsCount, CollectionWithRank>)
  return mapIndexed((collection, index) => assoc('rank', index + 1, collection), collections)
}

export function getRankedCollections(limit?: number): Promise<CollectionWithRank[]> {
  return pipe<[], Promise<Collection[]>, Promise<CollectionWithRank[]>>(
    getAllCollections,
    andThen(
      pipe(
        map(collectionWithSwapsCount),
        promiseAll,
        andThen(
          pipe(
            sortWith([descend(prop('swapsCount')), ascend(prop('name'))]),
            when<CollectionWithSwapsCount[], CollectionWithSwapsCount[]>(
              always(isNotNil(limit)),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              take(limit!)
            ),
            addRank
          )
        )
      )
    )
  )()
}
