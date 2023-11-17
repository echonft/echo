import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllCollectionSwapsCounts } from '@echo/firestore/crud/collection-swaps-count/get-all-collection-swaps-counts'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { getSwapsCountForCollection } from '@echo/frontend/lib/server/helpers/collection/get-swaps-count-for-collection'
import { selectCollectionsFields } from '@echo/frontend/lib/server/helpers/collection/select-collections-fields'
import { sliceCollections } from '@echo/frontend/lib/server/helpers/collection/slice-collections'
import { sortCollections } from '@echo/frontend/lib/server/helpers/collection/sort-collections'
import type { Collection } from '@echo/model/types/collection'
import {
  always,
  andThen,
  assoc,
  assocPath,
  concat,
  converge,
  either,
  identity,
  includes,
  isNil,
  lens,
  map,
  over,
  path,
  pipe,
  prop,
  unless,
  view
} from 'ramda'

interface PipeArgs {
  constraints: QueryConstraints<Collection>
  collections: Collection[]
}

export async function getAllCollectionsWithSwapsCount(constraints: QueryConstraints<Collection> | undefined) {
  const swapCounts = await getAllCollectionSwapsCounts()
  const collections = await pipe<[], Promise<Collection[]>, Promise<Collection[]>>(
    getAllCollections,
    andThen(
      map<Collection, Collection>(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        converge(assoc('swapsCount'), [
          converge(getSwapsCountForCollection, [prop('id'), always(swapCounts)]),
          identity
        ])
      )
    )
  )()

  if (isNil(constraints)) {
    return collections
  }
  const selectLens = lens<PipeArgs, string[] | undefined>(
    path(['constraints', 'select']),
    assocPath(['constraints', 'select'])
  )
  return pipe<[PipeArgs], PipeArgs, PipeArgs, PipeArgs, PipeArgs, Collection[]>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unless(pipe(view(selectLens), either(isNil, includes('swapsCount'))), over(selectLens, concat(['swapsCount']))),
    sortCollections,
    selectCollectionsFields,
    sliceCollections,
    prop('collections')
  )({ constraints, collections })
}
