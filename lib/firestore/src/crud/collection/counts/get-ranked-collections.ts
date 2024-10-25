import { getCollectionSwapsCount } from '@echo/firestore/crud/collection/counts/get-collection-swaps-count'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
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

interface CollectionDocumentWithSwapsCount extends CollectionDocument {
  readonly swapsCount: number
}

interface CollectionDocumentWithRank extends CollectionDocumentWithSwapsCount {
  rank: number
}

async function collectionWithSwapsCount(collection: CollectionDocument): Promise<CollectionDocumentWithSwapsCount> {
  const swapsCount = await getCollectionSwapsCount(collection.slug)
  return assoc('swapsCount', swapsCount, collection)
}

function addRank(collections: CollectionDocumentWithSwapsCount[]): CollectionDocumentWithRank[] {
  const mapIndexed = addIndex(map<CollectionDocumentWithSwapsCount, CollectionDocumentWithRank>)
  return mapIndexed((collection, index) => assoc('rank', index + 1, collection), collections)
}

export function getRankedCollections(limit?: number): Promise<CollectionDocumentWithRank[]> {
  return pipe<[], Promise<CollectionDocument[]>, Promise<CollectionDocumentWithRank[]>>(
    getAllCollections,
    andThen(
      pipe(
        map(collectionWithSwapsCount),
        promiseAll,
        andThen(
          pipe(
            sortWith([descend(prop('swapsCount')), ascend(prop('name'))]),
            when<CollectionDocumentWithSwapsCount[], CollectionDocumentWithSwapsCount[]>(
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
